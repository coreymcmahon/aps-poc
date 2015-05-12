var React = require('react');
var GoogleMaps = require('react-google-maps').GoogleMaps;
var Marker = require('react-google-maps').Marker;

var LocationStore = require('../stores/LocationStore');

var PlantSiteActions = require('../actions/PlantSiteActions');

// components
var MapView = require('./MapView');
var Link = require('react-router').Link;
var LoadingOverlay = require('./LoadingOverlay');

function getStateFromStore() {
    return {
        location: LocationStore.getLocation(),
        initialized: LocationStore.isInitialized(),
        loading: LocationStore.isLoading()
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
                            <h3>Let&#39;s find your address...</h3>
                            <p>We tried to locate you on the map. Is this your home?</p>

                            <div className="col-md-12">
                                <Link to="sites" className="btn btn-primary form-control" onClick={this._handleYesClick}>YES, this is my home</Link>
                            </div>
                            <div>&nbsp;</div>
                            <div className="col-md-12">
                                <Link to="search" className="pull-right">No, this is not my home</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <LoadingOverlay loading={this.state.loading}/>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    },

    _handleYesClick: function () {
        PlantSiteActions.findSites();
    }
});

module.exports = HomeView;