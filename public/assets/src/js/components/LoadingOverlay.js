var React = require('react');

var LoadingOverlay = React.createClass({

    render: function () {

        if (this.props.loading === false) {
            return(
                <div></div>
            );
        }

        return (
            <div className="modal-backdrop fade in">
                <div className="modal show" tabIndex="-1" role="dialog">
                    <div className="modal-dialog show">
                        <div className="modal-content">

                            <div className="modal-body">
                                <p className="center lead">
                                    Loading...<br/><br/>
                                    <img className="loading-img" src="/assets/dist/img/loader.gif"/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoadingOverlay;