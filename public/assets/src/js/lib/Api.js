var jquery = require('jquery');
var googleMaps = google.maps;

module.exports = {

    geocodeAddress: function (address, callback) {

        var geocoder = new googleMaps.Geocoder();

        geocoder.geocode({'address': address, 'region': 'US'}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

                callback({
                    latitude: results[0].geometry.location.lat(),
                    longitude: results[0].geometry.location.lng()
                });

            } else {

                callback(false);

            }
        });
    },

    findPlantSites: function (latitude, longitude, callback) {

        jquery.getJSON('/sites', {
            latitude: latitude,
            longitude: longitude
        }).success(function (json) {
            return callback(json);
        }).error(function () {
            return callback(false);
        });
    }

};