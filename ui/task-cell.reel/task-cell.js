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
            if (!this.task) {
                this.task = {data:{}};
            }

            return this.task.data.title;
        },
        set: function(title) {
            if (!this.task) {
                this.task = {data: {}};
            }
            if (this.task.data.title != title) {
                this.isTitleDirty = true;
                this.task.data.title = title;
            }
        }
    },
    
    completed: {
        get: function(){
            if (!this.task) {
                this.task = {data: {}};
            }

            return this.task.data.completed;
        },
        set: function(completed) {
            if (!this.task) {
                this.task = {data: {}};
            }
            if (this.task.data.completed != completed) {
                this.task.data.completed = completed;
                this.zetapushService.saveTodo(this.task);
            }
        }
    },
    
    _task: {
        value: null
    },
    
    task: {
        get: function() {
            return this._task;
        },
        set: function(task) {
            this._task = task;
            this.needsDraw = true;
        }
    },
    
    constructor: {
        value: function TaskCell() {
            this.super();
        }
    },
    
    enterDocument: {
        value: function(firstTime) {
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
