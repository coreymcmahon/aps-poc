var React = require('react');
var GoogleMaps = require('react-google-maps').GoogleMaps;
var Marker = require('react-google-maps').Marker;


function fitBounds(points, map) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0 ; i < points.length ; i++) {
        bounds.extend(new google.maps.LatLng(points[i].lat, points[i].lng));
    }
    setTimeout(function () {
        debug = map;
        map.fitBounds(bounds);   
        map.setZoom(map.getZoom() + 2);     
    }, 500);
}


var MapView = React.createClass({

    /**
     * props:
     *  - location={[?, ?]}
     *  - initialized={true}
     *  - markers={[{name: "something", lat: ?, lng: ?}]}
     *  - zoom={16}
     *
     *  icons: http://kml4earth.appspot.com/icons.html#shapes
     */

    getLocation: function () {
        return { lat: this.props.location[0], lng: this.props.location[1] };
    },

    componentWillReceiveProps: function (nextProps) {
        
        if (nextProps.markers && nextProps.markers.length > 0) {
            var points = [this.getLocation()];
            nextProps.markers.map(function (marker) { points.push({ lat: marker.latitude, lng: marker.longitude }); });
            fitBounds(points, this.refs.map);
        }

    },

    getLocationMarker: function () {

        if (this.props.initialized) {

            var location = this.getLocation();

            return (
                <Marker key="0" position={location} />
            );
        } else {
            return null;
        }
    },

    getSiteMarkers: function () {
        return this.props.markers.map(function (element) {

            var position = {
                lat: element.latitude,
                lng: element.longitude
            };

            return (
                <Marker key={element.id} position={position} name={element.name} icon="http://maps.google.com/mapfiles/kml/pal3/icon21.png" />
            );
        });
    },

    render: function () {

        var location = this.getLocation();
        var locationMarker = this.getLocationMarker();
        var siteMarkers = this.getSiteMarkers();

        var containerProps = { style: { height: "100%", width: "100%" } };

        return (
            <GoogleMaps googleMapsApi={google.maps}
                ref="map"
                zoom={this.props.zoom}
                center={location}
                containerProps={containerProps}>
                {locationMarker}
                {siteMarkers}
            </GoogleMaps>
        );
    }
});

module.exports = MapView;