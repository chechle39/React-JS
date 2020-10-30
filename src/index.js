import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import Home from './components/Home';
import store from './store';
import { Provider } from 'react-redux';
import { history } from './his';
import App from './components/App';

ReactDOM.render((
   <Provider store={store}>
      <Router history={history}>
      <Switch>
         <Route exact  path="/" component={App}/>
         <Route  path="/home" component={Home} />
         <Route  path="/app" component={App} />
      </Switch>
        
      </Router>
   </Provider>

), document.getElementById('root'));
