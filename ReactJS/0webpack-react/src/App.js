import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Bundle from './Bundle'


import Page1 from 'bundle-loader?lazy!./module/Page1';
import Page2 from 'bundle-loader?lazy!./module/Page2';
import NotFoundPage from 'bundle-loader?lazy!./module/404';

import './styles/App.scss'
function lazyLoad(mod){
  return (props) => (
    <Bundle load={mod}>
      {(Mod) => <Mod {...props}/>}
    </Bundle>
  )
}

export default class App extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/page1" component={lazyLoad(Page1)}></Route>
          <Route path="/page2" component={lazyLoad(Page2)}></Route>
          <Route component={lazyLoad(NotFoundPage)}></Route>
        </Switch>
      </HashRouter>
    )
  }
}