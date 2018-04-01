import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
import App from './components/App';
import SignUPPage from './components/users/SignUPPage';
import SignInPage from './components/login/SignInPage';
import Dashboard from './components/dashboard/Dashboard';
import { createStore, combineReducers } from 'redux';
import cookies from 'react-cookie';
import * as reducers from './reducers';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';


const baseHistory = browserHistory
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));

const store = createStore(reducer)
const history = syncHistoryWithStore(baseHistory, store)

function isLoggedIn(nextState, replace) {
    if(nextState.location.pathname.indexOf('/',1) > 0)
    {
        cookies.save('active', nextState.location.pathname.substring(0, nextState.location.pathname.indexOf('/',1)), { path: '/' });
    }else{
        cookies.save('active', nextState.location.pathname, { path: '/' });
    }
    
  if(cookies.load('access_token') && cookies.load('refresh_token'))
  {
    return true;
  }
  else {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
      query: ''
    })
  }
}


export default (
     <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={SignUPPage}/>
                    <Route path="addUser" component={SignUPPage}/>
                    <Route path="login" component={SignInPage}/>
                    <Route path="dashboard" component={Dashboard}/>
                </Route>      
            </Router>
        </div>
    </Provider>
);
