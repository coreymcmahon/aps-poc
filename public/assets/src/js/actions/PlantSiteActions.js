var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlantSiteConstants = require('../constants/PlantSiteConstants');

var PlantSiteActions = {

    findSites: function () {
        AppDispatcher.dispatch({
            actionType: PlantSiteConstants.FIND_SITES
        });
    },

    updateSites: function (sites) {
        AppDispatcher.dispatch({
            actionType: PlantSiteConstants.UPDATE_SITES,
            sites: sites
        });
    }

};

module.exports = PlantSiteActions;