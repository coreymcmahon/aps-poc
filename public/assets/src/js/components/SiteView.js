var React = require('react');
var GoogleMaps = require('react-google-maps').GoogleMaps;
var Marker = require('react-google-maps').Marker;

var LocationActions = require('../actions/LocationActions');

var LocationStore = require('../stores/LocationStore');
var PlantSiteStore = require('../stores/PlantSiteStore');

// components
var MapView = require('./MapView');
var Link = require('react-router').Link;
var LoadingOverlay = require('./LoadingOverlay');

function getStateFromStore() {
    return {
        location: LocationStore.getLocation(),
        initialized: LocationStore.isInitialized(),
        sites: PlantSiteStore.getSites(),
        loading: PlantSiteStore.isLoading()
    };
}

var SiteView = React.createClass({

    getInitialState: function () {
        return getStateFromStore();
    },

    componentDidMount: function () {
        LocationStore.addChangeListener(this._onChange);
        PlantSiteStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        LocationStore.removeChangeListener(this._onChange);
        PlantSiteStore.removeChangeListener(this._onChange);
    },

    render: function () {

        var sites = this.renderSites();

        var markers = this.state.sites.map(function (site) {
            return {
                name: site.name,
                latitude: site.latitude,
                longitude: site.longitude
            };
        });

        return (
            <div className="full-size">

                <MapView location={[this.state.location.latitude, this.state.location.longitude]}
                    initialized={this.state.initialized}
                    zoom={16}
                    markers={markers} />

                <div className="bottom-panel">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h3>Sites within distance</h3>
                            {sites}
                            <Link to="/" className="pull-right">Restart...</Link>
                        </div>
                    </div>
                </div>

                <LoadingOverlay loading={this.state.loading} />
            </div>
        );
    },

    renderSites: function () {
        if (this.state.sites.length === 0) {
            return (
                <div className="lead">
                    There are no sites within range.
                </div>
            );
        } else {
            return (
                <div>
                    <div className="lead">
                        There are {this.state.sites.length} site(s) within range.
                    </div>
                    <button className="btn btn-success btn-lg">
                        <span className="glyphicon glyphicon-heart"> </span> Find nearest dispensary
                    </button>
                </div>
            );
        }
    },

    _handleRestartClick: function () {
        // no-op
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});

module.exports = SiteView;