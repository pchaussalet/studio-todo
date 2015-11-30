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
    
    completed: {
        get: function(){
            return this.task.completed;
        },
        set: function(completed) {
            if (this.task.completed != completed) {
                this.task.completed = completed;
                this.zetapushService.saveTodo(this.task);
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
            this.needsDraw = true;
            console.log(firstTime, this.task, this);
        }
    },
    
    handleTextFieldAction: {
        value: function(event) {
            this.isTitleDirty = false;
            this.zetapushService.saveTodo(this.task);
        }
    }
});
