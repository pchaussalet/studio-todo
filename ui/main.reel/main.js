/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    ZetapushService = require('core/zetapush-service').ZetapushService;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    tasksController: {
        value: null
    },
    
    zetapushService: {
        value: null
    },

    constructor: {
        value: function Main() {
            this.super();
            this.zetapushService = new ZetapushService();
        }
    },
    
    todos: {
        value: null
    },

    enterDocument: {
        value: function(firstTime) {
            if (firstTime) {
                var self = this;
                this.zetapushService.connect()
                .then(function() {
                    return self.zetapushService.getTodoList()
                })
                .then(function(todoList) {
                    self.todos = todoList;                    
                    self.zetapushService.registerHandler('push', function(todo) {
                        self.todos.push(todo);
                    });
                    self.zetapushService.registerHandler('update', function(todo) {
                        var index = -1;
                        for (var i = 0, todosLength = self.todos.length; i < todosLength; i++) {
                            var entry = self.todos[i];
                            if (entry.zp_guid && entry.zp_guid === todo.zp_guid) {
                                index = i;
                                break;
                            }
                        }
                        if (index > -1) {
                            self.todos.splice(index, 0 ,todo);
                            self.todos.splice(index+1, 1);
                        }
                    });
                });
            }
        }
    },
    
    handleAddTaskButtonAction: {
        value: function(evt) {
            var self = this;
            this.zetapushService.addTodo();
        }
    },
    
    handleClearCompletedButtonAction: {
        value: function (evt) {
            var tasksController = this.templateObjects.tasksController,
                completedTasks = tasksController.getPath("content.filter{data.completed}");

            tasksController.deleteEach(completedTasks);
            for (var i = 0, tasksLength = completedTasks.length; i < tasksLength; i++) {
                this.zetapushService.removeTodo(completedTasks[i]);
            }
        }
    }    
});
