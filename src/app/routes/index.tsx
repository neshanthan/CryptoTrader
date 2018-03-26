import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Home, Member } from 'containers';
import App from 'containers/App';
import Login from 'containers/Login';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="member" component={Member} />
  </Route>
);
