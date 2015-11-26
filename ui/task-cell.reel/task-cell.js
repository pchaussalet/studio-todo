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
    _title: {
        value: null
    },
    
    
    title: {
        get: function() {
            return this._title;
        },
        set: function(title) {
            if (this._title != title) {
                this.isTitleDirty = true;
                this._title = title;
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
