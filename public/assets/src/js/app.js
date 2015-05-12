
var React = require('react');
//var jquery = require('jquery');

// react-router
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

// components
var HomeView = require('./components/HomeView');
var SearchView = require('./components/SearchView');
var SiteView = require('./components/SiteView');

var LocationActions = require('./actions/LocationActions')

// app
var App = React.createClass({
    render: function () {
        return (
            <RouteHandler/>
        );
    }
});

// initialize
var routes = (
    <Route name="app" path="/" handler={App}>
        <Route path="/search" name="search" handler={SearchView}/>
        <Route path="/sites" name="sites" handler={SiteView}/>
        <DefaultRoute handler={HomeView}/>
    </Route>
);


Router.run(routes, Router.HashLocation, function (Root) {
    React.render(<Root/>, document.getElementById('react-app'));
});

// run
function getPosition (highAccuracy, callback, error) {
    navigator.geolocation.getCurrentPosition(callback, error, {
        timeout: 5000,
        enableHighAccuracy: highAccuracy,
        maximumAge: Infinity
    });
}


var callback = function (result) { LocationActions.setLocation(result.coords.latitude,result.coords.longitude); };
getPosition(true, callback, function () {
    console.log('high accuracy geolocation failed, falling back to normal mode...');
    // if high accuracy fails, fallback to normal mode
    getPosition(false, callback, function () {
        console.log('geolocation failed...');
    });
});