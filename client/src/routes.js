import React from 'react';
import { Router, Route } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Live from './containers/Live';
import Create from './containers/Create';
import Dashboard from './containers/Dashboard';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <Route path="/create" components={{content: Create}} />
      <Route path="/live/:channel" component={Live} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
