import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

export default class Layout extends Component {
  static propTypes = {
    aside: PropTypes.element,
    header: PropTypes.element,
    children: PropTypes.element
  };

  render() {
    return (
      <div className="container">
        <header className="header">{this.props.header} </header>
        <section className="wrapper">
          <section className="left">{this.props.aside}</section>
          <section className="rigth">{this.props.children}</section>
        </section>
      </div>
    );
  }
}
