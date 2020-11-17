import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'
export default class Arrow extends Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  render() {
    return (
      <div className="arrow">
        <span className="left" onClick={() => {
          this.props.onChange && this.props.onChange('left')
        }}>&lt;</span>
        <span className="right" onClick={() => {
          this.props.onChange && this.props.onChange('right')
        }}>&gt;</span>
      </div>
    )
  }
}
