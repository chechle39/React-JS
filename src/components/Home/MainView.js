import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import { Link } from 'react-router-dom';
import ArticleList from "../ArticleList";

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const GlobalFeedTab = props => {
  console.log(props);
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        Global Feed
        </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound" /> {props.tag}
      </a>
    </li>
  );
};
const MainView = props => {
  console.log(`main view ${props}`);
  return (<div className="col-md-9">
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">

        <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />
         <TagFilterTab tag={props.tag} />
      </ul>

    </div>
      
    <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
  </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
