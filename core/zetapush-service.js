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

    constructor: {
        value: function ZetapushService() {
            this.resourceId = localStorage['resource'] = localStorage['resource'] || zp.makeResourceId();
            
            this.macroService = new zp.service.Generic('Lghx');
            this.stackService = new zp.service.Generic('3vJB');
            this.gdaService = new zp.service.Generic('dX6v');
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
            
            this.macroService.on('listTodoList', function(msg) {
                var todoListFound = false;
                if (msg.data && msg.data.result && msg.data.result && msg.data.result.todoList) {
                    for (var i = 0, todoListLength = msg.data.result.todoList.content.length; i < todoListLength; i++) {
                        if (msg.data.result.todoList.content[i].detail.userName === self.todoListName) {
                            self.ZPTodoList = msg.data.result.todoList.content[i];
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

            this.macroService.on('createTodoList', function(msg) {
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
            
            this.macroService.on('joinTodoList', function(msg) {
                console.log(msg);
                console.log('todoList joined:', self.todoListName);
                deferred.resolve();
            });
            
            var data = {
                ownerId: this.ZPTodoList.ownerId,
                todoListId: this.ZPTodoList.todoListId
            };
            
            console.log(this.ZPTodoList);

            this.macroService.send('call', { name: 'joinTodoList', parameters: data });
            
            return deferred.promise;
        }
    },
    
    addTodo: {
        value: function(todo) {
            console.log(todo);
        }
    }
});
