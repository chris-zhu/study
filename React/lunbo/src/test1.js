import React, { Component } from 'react'

export default class test1 extends Component {
  constructor(props){
    super(props)
    this.state = {
      isToggle: true,
    }
    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(){
    this.setState(state=>{
      return {
        isToggle: !state.isToggle
      }
    })
  }

  render() {
    // if(true) return false
    return (
    <button onClick={this.handleClick}>{this.state.isToggle?'ON':'OFF'}</button>
    )
  }
}
