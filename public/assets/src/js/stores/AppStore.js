
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

/**
 *
 */
var AppStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    // required in implementing subclasses:
    // dispatcherIndex: Dispatcher.register();

});

module.exports = AppStore;