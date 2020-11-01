import React, { Component } from 'react';
import agent from '../agent';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import { history } from '../his';

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
            // this.context.router.replace(nextProps.redirectTo);
            // this.props.history.push(nextProps.redirectTo)

            // history.push(nextProps.redirectTo)
            this.props.history.push('/');
            this.props.onRedirect();
        }
    }
    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        console.log(`tolen ${token}`);
        if (token) {
            agent.setToken(token);
        }
        this.props.onLoad(token ? agent.Auth.current() : null, token)
    }
    render() {
        if (this.props.appLoaded) {
            return (

                <BrowserRouter history={history}>
                    <div>
                        <Header
                            appName={this.props.appName}
                            currentUser={this.props.currentUser} />
                        {this.props.children}
                    </div>

                    <Route exact path="/" component={Home} />

                    <Route exact path="/login" component={Login} />
                </BrowserRouter>
            );
        }
        return (
            <BrowserRouter history={history}>
                <div>
                    <Header
                        appName={this.props.appName}
                        currentUser={this.props.currentUser} />
                </div>

                <Route exact path="/" component={Home} />

                <Route exact path="/login" component={Login} />
            </BrowserRouter>
        );
    }
}
App.contextTypes = {
    router: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
