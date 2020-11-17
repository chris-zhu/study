import React, { Component } from 'react'
import Test2_1 from './test2_1'

export default class test2 extends Component {
  state = {
    tempValue: '',
  }
  value1Change = (e) => {
    const value = e.target.value
    this.setState({
      tempValue: Number(value),
    })
  }
  value2Change = (e) => {
    const value = e.target.value
    this.setState({
      tempValue: Number(value) / 1000,
    })
  }
  render() {
    const value1 = this.state.tempValue
    const value2 = this.state.tempValue * 1000
    return (
      <div>
        <Test2_1 tempValue={value1} tempValueChange={this.value1Change} />
        <Test2_1 tempValue={value2} tempValueChange={this.value2Change} />
      </div>
    )
  }
}
