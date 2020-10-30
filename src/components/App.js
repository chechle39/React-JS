import React, { Component } from 'react';
import agent from '../agent';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

const mapStateToProps = state => ({
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
});
const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT })
});
class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.context.router.replace(nextProps.redirectTo);
            this.props.onRedirect();
        }
        console.log(`tolen ${nextProps}`);
    }
    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        console.log(`tolen ${token}`);
        if (token) {
            agent.setToken(token);
        }
        this.props.onLoad(token ? agent.Auth.current() : 'tuanlt6', token)
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Header appName={this.props.appName} />
            </div>

        );
    }
}
App.contextType = {
    router: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
