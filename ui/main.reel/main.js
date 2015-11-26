/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    Application = require("montage/core/application").application,
    ZetapushService = require('core/zetapush-service').ZetapushService;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
/*
    tasksController: {
        value: null
    },
*/    
    constructor: {
        value: function Main() {
            this.super();
            Application.zetapushService = new ZetapushService();
            this.tasksController.addRangeAtPathChangeListener("content", this, "handleContentChange");
        }
    },

    handleClearCompletedButtonAction: {
        value: function (evt) {
            var tasksController = this.templateObjects.tasksController,
                completedTasks = tasksController.getPath("content.filter{completed}");

            tasksController.deleteEach(completedTasks);
        }
    },
    
    handleContentChange: {
        value: function() {
            console.log(arguments);
        }
    }
});
