import React, { Component } from 'react';
import agent from '../agent';
import { HOME_PAGE_UNLOADED, PROFILE_PAGE_LOADED } from '../constants/actionTypes';
import { connect } from 'react-redux';
import ArticleList from './ArticleList';
import { Link } from 'react-router-dom';
import { history } from '../his';


const FollowUserButton = props => {
    let classes = 'btn btn-sm action-btn';
    // if (props.user.following) {
    //     classes += ' btn-secondary';
    // } else {
    //     classes += ' btn-outline-secondary';
    // }
    const handleClick = e => {

    }
    return (
        <button
            className={classes}
            onClick={handleClick}>
            <i className="ion-plus-round"></i>
          &nbsp;
            {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
        </button>
    );
}


const mapStateToProps = state => ({
    ...state.articleList,
    currentUser: state.common.currentUser,
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    // onClickTag: (tag, pager, payload) =>
    //   dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
    onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
    onUnload: () =>
      dispatch({  type: HOME_PAGE_UNLOADED })
});
class Profile extends Component {
    state = {};
    componentWillMount() {
        console.log(this.props.match.params.username.split('@')[1]);
        this.props.onLoad(Promise.all([
            agent.Profile.get(this.props.match.params.username.split('@')[1]),
            agent.Articles.byAuthor(this.props.match.params.username.split('@')[1])
        ]));
    }
    componentWillUnmount() {
        this.props.onUnload();
      }
    onClickRouterArticles(e){
        history.push('/sample');
        this.props.history.push(`/@${e}`)
        console.log(e);
    }
    onClickRouterFavoritedArticles(e){
        history.push('/sample');
        this.props.history.push(`/@${e}/favorites`)
        console.log(e);
    }
    renderTabs() {
        return (
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        onClick = {(e) => {this.onClickRouterArticles(this.props.profile.username)}}
                       >
                        My Articles
              </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        onClick = {(e) => {this.onClickRouterFavoritedArticles(this.props.profile.username)}}>
                        Favorited Articles
              </Link>
                </li>
            </ul>
        );
    }

    render() {
        const profile = this.props.profile;
        const isUser = this.props.currentUser &&
        this.props.profile.username === this.props.currentUser.username;
        return (
            <div className="profile-page">

                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <img src={profile.image} className="user-img" alt={profile.username} />
                                <h4>{profile.username}</h4>
                                <p>{profile.bio}</p>
                                <FollowUserButton
                                    isUser={isUser}
                                    user={profile}
                                    follow={this.props.onFollow}
                                    unfollow={this.props.onUnfollow}
                                />
                            </div>

                        </div>

                    </div>


                </div>

                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-md-10 offset-md-1">

                            <div className="articles-toggle">
                                {this.renderTabs()}
                            </div>
                            <ArticleList
                                pager={this.props.pager}
                                articles={this.props.articles}
                                articlesCount={this.props.articlesCount}
                                state={this.props.currentPage} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
