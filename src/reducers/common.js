import {
    APP_LOAD,
    REDIRECT,
  } from '../constants/actionTypes';
  
  const defaultState = {
    appName: 'Conduit',
    token: null,
    viewChangeCounter: 0
  };
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case APP_LOAD:
          console.log(state);
        return {
          ...state,
          token: action.token || null,
          appLoaded: true,
          currentUser: action.payload ? action.payload.user : null
        };
      case REDIRECT:
        return { ...state, redirectTo: null };
     
      default:
        return state;
    }
  };
  