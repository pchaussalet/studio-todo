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
            var self = this;
            this.super();
            this.zetapushService = new ZetapushService();
            this.zetapushService.connect()
                .then(function() {
                    self.zetapushService.getTodoList()
                })
                .then(function(todoList) {
                    self.templateObjects.tasksController.content = todoList;
                });
        }
    },

    enterDocument: {
        value: function(firstTime) {
            if (firstTime) {
            }
        }
    },
    
    handleClearCompletedButtonAction: {
        value: function (evt) {
            var tasksController = this.templateObjects.tasksController,
                completedTasks = tasksController.getPath("content.filter{completed}");

            tasksController.deleteEach(completedTasks);
        }
    }    
});
