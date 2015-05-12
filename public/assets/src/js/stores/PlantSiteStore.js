var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppStore = require('./AppStore');

var _sites = [];

var PlantSiteStore = assign({}, AppStore, {

    getSites: function () {
        return _sites;
    },

    dispatcherIndex: AppDispatcher.register(function(action) {

        switch(action.actionType) {

            // @TODO

        }

        return true;
    })

});

module.exports = PlantSiteStore;