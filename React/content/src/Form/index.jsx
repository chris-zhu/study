

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from "./input";
import Button from "./button";
import { Provider } from './content'
export default class Form extends Component {

  static propTypes = {
    onSubmit: PropTypes.func
  }

  state = {
    formData: {},
    changeFormData: (name, val) => {
      this.setState({
        formData: {
          ...this.state.formData,
          [name]: val
        }
      })
    },
    submit: () => {
      this.props.onSubmit && this.props.onSubmit(this.state.formData)
      // let self = this
      // return function () {
      //   self.props.onSubmit && self.props.onSubmit(self.state.formData)
      // }
    }
  }

  render() {
    return (
      <div>
        <Provider value={{ ...this.state }}>
          {this.props.children}
        </Provider>
      </div>
    )
  }
}

Form.Input = Input
Form.Button = Button
