var AppDispatcher = require('../dispatcher/AppDispatcher');
var LocationConstants = require('../constants/LocationConstants');

var LocationActions = {

    setLocation: function (latitude, longitude) {
        AppDispatcher.dispatch({
            actionType: LocationConstants.SET_LOCATION,
            latitude: latitude,
            longitude: longitude
        });
    },

    resetLocation: function () {
        AppDispatcher.dispatch({
            actionType: LocationConstants.RESET_LOCATION
        });
    },

    findAddress: function (query) {
        AppDispatcher.dispatch({
            actionType: LocationConstants.FIND_ADDRESS,
            query: query
        });
    }

};

module.exports = LocationActions;