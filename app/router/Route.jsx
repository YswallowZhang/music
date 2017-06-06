import React, {Component, PropTypes} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import App from "../components/App.jsx";
import SearchBar from '../components/search/SearchBar.jsx';
import SearchResult from '../components/search/SearchResult.jsx';


const RouteConfig = (
    <Router>  
        <div>
            <Route path="/" component={App} />
        </div>
    </Router>
)
export default RouteConfig;
