import React, { Component } from 'react';
import Banner from './Banner';
import MainView from './MainView';
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER
  } from '../../constants/actionTypes';
  import { connect } from 'react-redux';
  import agent from '../../agent';

const mapStateToProps = state => ({
    ...state.home,
    appName: state.common.appName,
    token: state.common.token
  });
  
  const mapDispatchToProps = dispatch => ({
    // onClickTag: (tag, pager, payload) =>
    //   dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
    onLoad: (tab, pager, payload) =>
      dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
    // onUnload: () =>
    //   dispatch({  type: HOME_PAGE_UNLOADED })
  });
class Home extends Component {
    componentWillMount() {
        const tab = this.props.token ? 'feed' : 'all';
        const articlesPromise = this.props.token ?
          agent.Articles.feed :
          agent.Articles.all;
    
        this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
      }
    
    render() {
        return (
            <div className="home-page">
                <Banner token={this.props.token} appName={this.props.appName} />
                <MainView/>
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
