import React, {Component} from 'react';
export default class Bundle extends Component {
  state = {
    mod: null
  }
  componentWillMount(){
    this.load(this.props)
  }
  load (props) {
    this.setState({
      mod: null
    })
    props.load((mod)=> {
      this.setState({
        mod: mod.default || mod
      })
    })
  }
  render () {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}