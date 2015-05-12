var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppStore = require('./AppStore');
var Api = require('../lib/Api');

var LocationConstants = require('../constants/LocationConstants');
var LocationActions = require('../actions/LocationActions');


var _location = {
    latitude: -41.2864,
    longitude: 174.7762
};
var _initialized = false;
var _loading = true;


var LocationStore = assign({}, AppStore, {

    getLocation: function () {
        return _location;
    },

    isInitialized: function () {
        return _initialized;
    },

    isLoading: function () {
        return _loading;
    },

    dispatcherIndex: AppDispatcher.register(function(action) {

        switch(action.actionType) {

            case LocationConstants.SET_LOCATION:

                _location = {
                    latitude: action.latitude,
                    longitude: action.longitude
                };
                _initialized = true;
                _loading = false;
                LocationStore.emitChange();
                break;

            case LocationConstants.RESET_LOCATION:
                _initialized = false;
                LocationStore.emitChange();
                break;

            case LocationConstants.FIND_ADDRESS:
                _loading = true;
                Api.geocodeAddress(action.query, function (result) {
                    if (result) {
                        LocationActions.setLocation(result.latitude, result.longitude);

                        // @TODO fix this
                        window.location.hash = "#/"

                    } else {
                        // show error // @TODO handle this in a better way
                        console.log('could not geocode address :(');
                    }
                });
                LocationStore.emitChange();
                break;

        }

        return true;
    })

});

module.exports = LocationStore;