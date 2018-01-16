import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
const render = Component => {
  ReactDOM.render(
      <Component/>
    ,
    document.getElementById('root')
  );
}
render(App);

if(module.hot) {
  console.log('进入更新')
  module.hot.accept();
}