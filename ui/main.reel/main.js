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
                    self.templateObjects.tasksController.content = todoList;
                    self.zetapushService.registerHandler('push', function(data) {
                        self.tasksController.add(data);
                    });
                    self.zetapushService.registerHandler('update', function(data) {
                        console.log(self.tasksController);
                        var updatedEntry = self.tasksController.iterations.filter(function(iteration) { 
                            return iteration.object.guid && iteration.object.guid === data.guid;
                        })[0];
                        updatedEntry.object.title = data.data.title;
                        self.needsDraw = true;
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
