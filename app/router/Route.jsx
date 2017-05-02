import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import App from "../components/App.jsx";//底部播放器

class Roots extends Component {
    render() {
        return <div>
            {this.props.children}
        </div>
    }
}

const RouteConfig = (
    <Router history={history}>
        <Route path='/' component='Roots'>
            <IndexRoute component={App} />
        </Route>
    </Router>
)
