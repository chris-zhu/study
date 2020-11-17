import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ctx from './content'


export default class input extends Component {

  static contextType = ctx

  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  static defaultProps = {
    type: 'text'
  }

  render() {
    return (
      <div>
        <input value={this.context.formData[this.props.name] || ''} name={this.props.name} type={this.props.type} onChange={this.onChange} />
      </div>
    )
  }

  onChange = e => {
    this.context.changeFormData(this.props.name, e.target.value)
  }
}
