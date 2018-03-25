import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, Login, Member } from 'containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="member" component={Member} />
  </Route>
);
