import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Bundle from './Bundle';

// import Label from 'bundle-loader?lazy!./page/label';
// import Login from 'bundle-loader?lazy!./page/login';
import Test from './page/test';
import Login from './page/login';

function lazyLoad(mod) {
  return (props) => (
    <Bundle load={mod}>
      {(Mod) => <Mod {...props} />}
    </Bundle>
  )
}
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/index' component={Test}></Route>
          <Route path='/' component={Login}></Route>
        </Switch>
      </Router>
    )
  }
}