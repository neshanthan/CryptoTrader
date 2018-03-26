import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Member } from 'containers';
import App from 'containers/App';
import Login from 'containers/Login';
import Home from 'containers/Home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="member" component={Member} />
  </Route>
);
