import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';

import {
    UPDATE_FIELD_AUTH,
    LOGIN,
    LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import { connect } from 'react-redux';
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'email', value}),
    onChangePassWord: value => 
        dispatch({type: UPDATE_FIELD_AUTH, key: 'passWord', value}),
    onSubmit: (email, password) => 
        dispatch ({type: LOGIN, payload: agent.Auth.login(email,password)}),
    unLoad: () => 
        dispatch({type: LOGIN_PAGE_UNLOADED})
})
class Login extends Component {
    state = {}
    constructor() {
        super();
        this.changeEmail = evn => this.props.onChangeEmail(evn.target.value);
        this.changePassWord =ev => this.props.onChangePassWord(ev.target.value);
        this.submitForm = (email,password) =>ev=>{
            ev.preventDefault();
            this.props.onSubmit(email, password);
        }
    }

    componentWillUnmount() {
        this.props.unLoad();
    }
    render() {
        const email = this.props.email;
        const password = this.props.passWord;
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign In</h1>
                            <p className="text-xs-center">
                                <Link to="register">
                                    Need an account?
                                </Link>
                            </p>


                            <form onSubmit={this.submitForm(email, password)}>
                                <fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={this.changeEmail}
                                        />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={this.changePassWord}
                                        />
                                    </fieldset>

                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit"
                                        disabled={this.props.inProgress}
                                    >
                                        Sign in
                                    </button>

                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
