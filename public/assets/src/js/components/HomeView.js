var React = require('react');
var GoogleMaps = require('react-google-maps').GoogleMaps;
var Marker = require('react-google-maps').Marker;

var LocationStore = require('../stores/LocationStore');

// components
var MapView = require('./MapView');
var Link = require('react-router').Link;

function getStateFromStore() {
    return {
        location: LocationStore.getLocation(),
        initialized: LocationStore.isInitialized()
    };
}

var HomeView = React.createClass({

    getInitialState: function () {
        return getStateFromStore();
    },

    componentDidMount: function () {
        LocationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        LocationStore.removeChangeListener(this._onChange);
    },

    render: function () {

        return (
            <div className="full-size">

                <MapView location={[this.state.location.latitude, this.state.location.longitude]}
                    initialized={this.state.initialized}
                    zoom={16}
                    markers={[]} />

                <div className="bottom-panel">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h3>Where is your home?</h3>
                            <p>We tried to locate you on the map. Is this your home?</p>
                            <Link to="sites" className="btn btn-success">Yes, this is my home</Link>
                            <Link to="search" className="btn btn-default">No, this is not my home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});

module.exports = HomeView;