var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppStore = require('./AppStore');
var LocationStore = require('./LocationStore');
var PlantSiteActions = require('../actions/PlantSiteActions');
var PlantSiteConstants = require('../constants/PlantSiteConstants');
var Api = require('../lib/Api');


var _sites = [];
var _loading = true;


var PlantSiteStore = assign({}, AppStore, {

    getSites: function () {
        return _sites;
    },

    isLoading: function () {
        return _loading;
    },

    dispatcherIndex: AppDispatcher.register(function(action) {

        switch(action.actionType) {

            case PlantSiteConstants.UPDATE_SITES:

                _sites = action.sites;
                _loading = false;
                PlantSiteStore.emitChange(); // no change
                break;

            case PlantSiteConstants.FIND_SITES:

                var location = LocationStore.getLocation();

                Api.findPlantSites(location.latitude, location.longitude, function (results) {

                    if (results) {
                        PlantSiteActions.updateSites(results);
                    } else {
                        console.log('Could not retrieve sites for this location');
                        // @TODO error message
                    }
                });

                _loading = true;

                PlantSiteStore.emitChange();
                break;
        }

        return true;
    })
});

module.exports = PlantSiteStore;