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
            console.log('get title');
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
    
    constructor: {
        value: function TaskCell() {
            this.super();
        }
    },
    
    enterDocument: {
        value: function(firstTime) {
            if (this.todos) {
                console.log('task',this.todos.map(function(x) { return x.data.title; }));
            }
            if (firstTime) {
                
            }
        }
    },
    
    handleTextFieldAction: {
        value: function(event) {
            this.isTitleDirty = false;
            this.zetapushService.saveTodo(this.task);
        }
    }
});
