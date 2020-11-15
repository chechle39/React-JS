import { combineReducers } from 'redux';
import home from './reducers/home';
import common from './reducers/common';
import articleList from './reducers/articleList';
import auth from './reducers/auth';
import profile from './reducers/profile';

export default combineReducers({
    auth,
    home,
    common,
    articleList,
    profile
});
