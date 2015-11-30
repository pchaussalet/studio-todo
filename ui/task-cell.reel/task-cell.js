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
    
    task: {
        value: {
            data: {}
        }
    },
    
    title: {
        get: function() {
            return this.task.data.title;
        },
        set: function(title) {
            if (this.task.data.title != title) {
                this.isTitleDirty = true;
                this.task.data.title = title;
            }
        }
    },
    
    completed: {
        get: function(){
            return this.task && this.task.data.completed;
        },
        set: function(completed) {
            if (this.task.data.completed != completed) {
                this.task.data.completed = completed;
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
            if (!firstTime) {
                this.needsDraw = true;
            }
            console.log(firstTime, this.task.data);
        }
    },
    
    handleTextFieldAction: {
        value: function(event) {
            this.isTitleDirty = false;
            this.zetapushService.saveTodo(this.task);
        }
    }
});
