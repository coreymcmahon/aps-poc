var React = require('react');
var GoogleMaps = require('react-google-maps').GoogleMaps;
var Marker = require('react-google-maps').Marker;

var MapView = React.createClass({

    /**
     * props:
     *  - location={[?, ?]}
     *  - initialized={true}
     *  - markers={[{name: "something", lat: ?, lng: ?}]}
     *  - zoom={16}
     */

    getLocation: function () {
        return { lat: this.props.location[0], lng: this.props.location[1] };
    },

    getLocationMarker: function () {
        if (this.props.initialized) {

            var location = this.getLocation();

            return (
                <Marker position={location} />
            );
        } else {
            return null;
        }
    },

    render: function () {

        var locationMarker = this.getLocationMarker();

        var location = this.getLocation();

        var containerProps = { style: { height: "100%", width: "100%" } };

        return (
            <GoogleMaps googleMapsApi={google.maps}
                ref="map"
                zoom={this.props.zoom}
                center={location}
                containerProps={containerProps}>
                {locationMarker}
            </GoogleMaps>
        );
    }
});

module.exports = MapView;