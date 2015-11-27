/**
 * @module core/zetapush-service
 */
var Montage = require("montage/core/core").Montage,
    Promise = require("montage/core/promise").Promise;
/**
 * @class ZetapushService
 * @extends Montage
 */
exports.ZetapushService = Montage.specialize(/** @lends ZetapushService# */ {
    todoListName: {
        get: function() {
            return 'studio-todo-shared'
        }
    },
    
    token: {
        value: null
    },
    
    publicToken: {
        value: null
    },
    
    resourceId: {
        value: null
    },
    
    auth: {
        value: null
    },
    
    macroService: {
        value: null
    },

    stackService: {
        value: null
    },

    gdaService: {
        value: null
    },
    
    ZPTodoList: {
        value: null
    },
    
    stackOwnerId: {
        value: null
    },
    
    stackId: {
        value: null
    },

    constructor: {
        value: function ZetapushService() {
            this.resourceId = localStorage['resource'] = localStorage['resource'] || zp.makeResourceId();
            
            this.macroService = new zp.service.Generic('Lghx');
            this.stackService = new zp.service.Generic('3vJB');
            this.gdaService = new zp.service.Generic('dX6v');
        }
    },
    
    registerHandler: {
        value: function(eventName, handler) {
            console.log(eventName, handler);
            this.stackService.on(eventName, function(msg) {
                return handler(msg.data);
            });
        }
    },
    
    connect: {
        value: function() {
            var self = this,
                deferred = Promise.defer();
            zp.onConnected(function(msg) {
                if (self.auth.getToken()){
                    self.token = localStorage['token']= self.auth.getToken();
                    self.publicToken = localStorage['publicToken']= self.auth.getPublicToken();
                }
                userId = self.auth.getUserId();
                console.log('Connected to Zetapush with userId:', userId);
                deferred.resolve();
            });

            zp.init('EX9cA_9n');
            this.auth = new zp.authent.Weak('DyCJ');
            zp.connect(this.auth.getConnectionData(this.token, this.resourceId));
            
            return deferred.promise;
        }
    },
    
    getTodoList: {
        value: function() {
            var self = this,
                deferred = Promise.defer();
            
            var handler = this.macroService.on('listTodoList', function(msg) {
                self.macroService.off(handler);
                var todoListFound = false;
                if (msg.data && msg.data.result && msg.data.result && msg.data.result.todoList) {
                    for (var i = 0, todoListLength = msg.data.result.todoList.content.length; i < todoListLength; i++) {
                        if (msg.data.result.todoList.content[i].detail.userName === self.todoListName) {
                            self.ZPTodoList = msg.data.result.todoList.content[i].detail;
                            todoListFound = true;
                            break;
                        }
                    }
                }
                if (todoListFound) {
                    deferred.resolve(self._joinTodoList());
                } else {
                    deferred.resolve(self._createTodoList());
                }
            });
            
            this.macroService.send('call', { name: 'listTodoList' });

            return deferred.promise;
        }
    },
    
    _createTodoList: {
        value: function() {
            var self = this,
                deferred = promise.defer();

            var handler = this.macroService.on('createTodoList', function(msg) {
                self.macroService.off(handler);
                console.log('todoList created:', self.todoListName);
                deferred.resolve(self._joinTodoList());
            });

            var params={
                name: 'createTodoList',
                debug: 4,
                parameters: {
                    userName: this.todoListName
                }
            };

            this.macroService.send('call', params);
            
            return deferred.promise;
        }
    },
    
    _joinTodoList: {
        value: function() {
            var self = this,
                deferred = Promise.defer();
            
            var handler = this.macroService.on('joinTodoList', function(msg) {
                self.macroService.off(handler);
                console.log('todoList joined:', self.todoListName);
                self.stackOwnerId = msg.data.result.ownerId;
                self.stackId = msg.data.result.todoListId;
                deferred.resolve(self._listTodos());
            });
            
            var data = {
                ownerId: this.ZPTodoList.owner,
                todoListId: this.ZPTodoList.todoListId
            };
            
            this.macroService.send('call', { name: 'joinTodoList', parameters: data });
            
            return deferred.promise;
        }
    },
    
    _listTodos: {
        value: function() {
            var self = this,
                deferred = Promise.defer();
            
            var handler = this.stackService.on('list', function(msg) {
                self.stackService.off(handler);
                console.log(msg.data.result.content);
                console.log('loading todos...');
                var todos = [];
                for (var i = 0, ZPtodosLength = msg.data.result.content.length; i < ZPtodosLength; i++) {
                    todos.push(msg.data.result.content[i]);
                }
                deferred.resolve(todos);
            });
            
            var params = {
                owner: this.stackOwnerId,
                stack: this.stackId
            };
            self.stackService.send('list', params);

            return deferred.promise;
        }
    },

    addTodo: {
        value: function() {
            var self = this,
                deferred = Promise.defer();
            
            var params={
                owner: this.stackOwnerId,
                stack: this.stackId,
                data: {data: {}}
            }
            this.stackService.send('push', params);
            
            return deferred.promise;
        }
    },

    saveTodo: {
        value: function(todo) {
            console.log('saving todo', todo);
            var params={
                owner: this.stackOwnerId,
                stack: this.stackId,
                guid: todo.guid,
                data: todo.data
            }
            this.stackService.send('update', params);
        }
    }
});
