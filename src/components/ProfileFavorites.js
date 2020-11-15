import React, { Component } from 'react';
import agent from '../agent';
import { PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from '../constants/actionTypes';
import { connect } from 'react-redux';
import { Profile, mapStateToProps } from './Profile';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => ({
    onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_PAGE_UNLOADED })
})
class ProfileFavorites extends Profile {
    componentWillMount(){
        this.props.onLoad(page => agent.Articles.favoritedBy(this.props.match.params.username.split('@')[1], page)
        , Promise.all([
            agent.Profile.get(this.props.match.params.username.split('@')[1]),
            agent.Articles.favoritedBy(this.props.match.params.username.split('@')[1])
        ]))
    }
    componentWillUnmount() {
        this.props.onUnload();
      }
      renderTabs() {
        return (
            <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick = {() => {this.onClickRouterArticles(this.props.profile.username)}}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            onClick = {(e) => {this.onClickRouterFavoritedArticles(this.props.profile.username)}}>
            Favorited Articles
          </Link>
        </li>
      </ul>
        );
      }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);