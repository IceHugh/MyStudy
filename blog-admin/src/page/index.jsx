import React, { Component } from 'react';
import '../style/test.styl';
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.testHandler = this.testHandler.bind(this);
  }
  testHandler(e) {
    console.log(this.files);
    console.log(this);
    console.log(e);
    console.log(e.target.files);
  }
  render() {
    return (
      <main>
        <h1>123shou123213121233</h1>
        <input type="file" onChange={this.testHandler} multiple directory="true" mozdirectory="true" webkitdirectory=""></input>
      </main>
    );
  }
} 