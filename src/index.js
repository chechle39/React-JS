import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import Home from './components/Home';
import store from './store';
import { Provider } from 'react-redux';
import { history } from './his';
import App from './components/App';
import Login from './components/Login';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render((
   <Provider store={store}>
      <BrowserRouter history={history}>
         <Switch>
            <Route exact path="*" component={App} />
         </Switch>

      </BrowserRouter>
      
   </Provider>

), document.getElementById('root'));
