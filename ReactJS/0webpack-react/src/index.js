import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader';

import App from './App';
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>
    , document.getElementById('root')
  )
}
render(App);
if (module.hot){
  module.hot.accept('./App',()=> {render(App)})
}

// export default class Test extends Component{
//   static propTypes = {
//     name: PropTypes.string,
//   }
//   render () {
//     return (
//       <div>This is test page!</div>
//     )
//   }
// }