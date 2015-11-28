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

    enterDocument: {
        value: function(firstTime) {
            if (firstTime) {
                var self = this;
                this.zetapushService.connect()
                .then(function() {
                    return self.zetapushService.getTodoList()
                })
                .then(function(todoList) {
                    //self.templateObjects.tasksController.content = todoList;
                    self.templateObjects.tasksController.addEach(todoList);
                    self.zetapushService.registerHandler('push', function(data) {
                        self.tasksController.add(data);
                    });
                    self.zetapushService.registerHandler('update', function(data) {
                        console.log(JSON.stringify(self.tasksController.content));
                        var index = self.tasksController.content.filter(function(entry) { 
                            return entry.guid && entry.guid === data.guid;
                        }).indexOf(true);
                        /*
                        var content = self.tasksController.content.slice();
                        var updatedEntry = content.filter(function(entry) { 
                            return entry.guid && entry.guid === data.guid;
                        })[0];
                        var index = content.indexOf(updatedEntry);
                        */
                        self.tasksController.swap(index, 1, [data]);
                        self.needsDraw = true;
                        console.log(JSON.stringify(self.tasksController.content));
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
        }
    }    
});
