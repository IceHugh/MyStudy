import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Index from './page/index';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' component={Index}></Route>
        </Switch>
      </Router>
    )
  }
}