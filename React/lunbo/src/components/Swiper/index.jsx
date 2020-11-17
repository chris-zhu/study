import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImgCon from './ImgCon'
import Arrow from './Arrow'
import Dots from './Dots'

import "./index.css"

export default class Swiper extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired, //宽
    height: PropTypes.number.isRequired, //高
    imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired, //图片数组
    autoDuration: PropTypes.number.isRequired, // 自动切换的时间
    duration: PropTypes.number.isRequired, // 完成一次间隔时间
  }
  static defaultProps = {
    width: 520,
    height: 280,
    imgSrcs: [],
    autoDuration: 2000,
    duration: 500
  }
  state = {
    curIndex: 0
  }
  // 自动切换
  timer = null
  autoSwiper() {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      let curIndex = (this.state.curIndex + 1) % this.props.imgSrcs.length
      this.setState({
        curIndex
      })
      this.imgCon.switchTo(this.state.curIndex)
    }, this.props.autoDuration);
  }

  componentDidMount() {
    this.autoSwiper()
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }


  imgConRef = el => {
    this.imgCon = el
  }
  arrowChange = type => {
    let curIndex = this.state.curIndex
    if (type === 'left') {
      curIndex--
      if (curIndex < 0) { curIndex = this.props.imgSrcs.length - 1 }
    } else {
      curIndex++
      if (curIndex > this.props.imgSrcs.length - 1) { curIndex = 0 }
    }
    this.setState({ curIndex })
    this.imgCon.switchTo(curIndex)
  }
  dotsChange = curIndex => {
    this.setState({
      curIndex
    })
    this.imgCon.switchTo(curIndex)
  }
  onMouseEnter = _ => {
    clearInterval(this.timer)
  }
  onMouseLeave = _ => {
    this.autoSwiper()
  }
  render() {
    return (
      <div className="swiper" style={{
        width: this.props.width,
        height: this.props.height
      }} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <ImgCon ref={this.imgConRef} imgSrcs={this.props.imgSrcs} width={this.props.width} height={this.props.height}
          duration={this.props.duration} />
        <Arrow onChange={this.arrowChange} />
        <Dots onChange={this.dotsChange} total={this.props.imgSrcs.length} current={this.state.curIndex} />
      </div>
    )
  }
}
