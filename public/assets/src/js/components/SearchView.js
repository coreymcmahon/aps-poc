var React = require('react');
var GoogleMaps = require('react-google-maps').GoogleMaps;
var Marker = require('react-google-maps').Marker;

var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');

// components
var MapView = require('./MapView');
var LoadingOverlay = require('./LoadingOverlay');

function getStateFromStore() {
    return {
        location: LocationStore.getLocation(),
        initialized: LocationStore.isInitialized(),
        loading: LocationStore.isLoading()
    };
}

var SearchView = React.createClass({

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
                initialized={false}
                zoom={16}
                markers={[]} />

                <div className="bottom-panel">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h3>Find your address</h3>
                            <p>Please enter your address below:</p>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" placeholder="123 Example street, Hollywood Los Angeles, CA, USA" ref="address"/>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-primary pull-right form-control" onClick={this._handleButtonClick}>
                                    <span className="glyphicon glyphicon-search"> </span> Find
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <LoadingOverlay loading={this.state.loading} />
            </div>
            );
    },
    _onChange: function () {
        this.setState(getStateFromStore());
    },
    _handleButtonClick: function () {
        var value = "" + React.findDOMNode(this.refs.address).value;
        LocationActions.findAddress(value);
    }
});

module.exports = SearchView;