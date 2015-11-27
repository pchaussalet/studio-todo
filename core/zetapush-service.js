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
            var self = this;
            
            this.macroService.on('joinTodoList', function(msg) {
                console.log(msg);
                if (msg.data.errors && msg.data.errors.length > 0) {
                    self.createTodoList();
                } else {
                    self.ZPTodoList = msg.data.result.todoList;
                    console.log(self.ZPTodoList);
                }
            });
            
            var params={
                name: 'joinTodoList',
                debug: 4,
                parameters: {
                    ownerId: 'studiotodo',
                    todoListId: 'list01'
                }
            };

            this.macroService.send('call', params);
        }
    },
    
    _listTodoLists: {
        value: function() {
            macroService.send('call', {
                name: 'listTodoList',
                debug: 4
            });
        }
    },
    
    createTodoList: {
        value: function() {
            var self = this;

            this.macroService.on('createTodoList', function(msg) {
                console.log(msg);
            });

            var params={
                name: 'createTodoList',
                debug: 4,
                parameters: {
                    userName: 'studio-todo',
                    todoListId: 'list01'
                }
            };

            this.macroService.send('call', params);
        }
    },
    
    addTodo: {
        value: function(todo) {
            console.log(todo);
        }
    }
});
