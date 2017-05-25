import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory, useRouterHistory } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import App from "../components/App.jsx";
import createHistory from 'history/createHashHistory'

import SearchBar from '../components/search/SearchBar.jsx';
import SearchResult from '../components/search/SearchResult.jsx';


// const RouteConfig = (
//     {/*<Router history={hashHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={SearchBar} />
//         </Route>
//     </Router>*/}
// )
// export default RouteConfig;
