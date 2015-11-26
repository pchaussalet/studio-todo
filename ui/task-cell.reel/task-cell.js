/**
 * @module ui/task-cell.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class TaskCell
 * @extends Component
 */
exports.TaskCell = Component.specialize(/** @lends TaskCell# */ {
    isTitleDirty: {
        value: false
    },
    
    title: {
        get: function() {
            return this.task.title;
        },
        set: function(title) {
            if (this.task.title != title) {
                this.isTitleDirty = true;
                this.task.title = title;
            }
        }
    },
    
    constructor: {
        value: function TaskCell() {
            this.super();
        }
    },
    
    enterDocument: {
        value: function(firstTime) {
            if (firstTime) {
                
            }
        }
    },
    
    handleTextFieldAction: {
        value: function(event) {
            this.isTitleDirty = false;
            this.zetapushService.addTodo(this.task);
        }
    }
});
