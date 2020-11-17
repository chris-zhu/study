import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css';

export default class Dots extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func
  }

  render() {
    let dots = []
    for (let i = 0; i < this.props.total; i++) {
      let dot = <span onClick={() => { this.props.onChange && this.props.onChange(i) }} className={i === this.props.current ? 'active' : ''} key={i}></span>
      dots.push(dot)
    }
    return (
      <div className='dots'>
        {dots}
      </div>
    )
  }
}
