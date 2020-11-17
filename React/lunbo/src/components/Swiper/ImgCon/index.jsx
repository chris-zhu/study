import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ImgCon extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired, //宽
    height: PropTypes.number.isRequired, //高
    imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired, //图片数组
    duration: PropTypes.number.isRequired, // 完成一次间隔时间
  }

  static defaultProps = {
    width: 520,
    height: 280,
    imgSrcs: [],
    duration: 500
  }

  tick = 16
  timer = null

  imgConRef = el => {
    this.imgCon = el
  }
  /**
   * 切换到第几张图片
   * @param {*} index 
   */
  switchTo(index) {
    // 设置正确的index
    if (index < 0) index = 0
    else if (index > this.props.imgSrcs.length - 1) {
      index = this.props.imgSrcs.length - 1
    }    
    // 设置移动的值
    const targetLeft = -index * this.props.width
    let curLeft = parseFloat(window.getComputedStyle(this.imgCon).marginLeft)
    // 计算运动的次数
    const times = Math.ceil(this.props.duration / this.tick)
    let curTimes = 0
    // 计算每次运动的距离
    const totalDis = targetLeft - curLeft
    const dis = totalDis / times
    // 停止之前的动画
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      curTimes++
      curLeft += dis
      this.imgCon.style.marginLeft = curLeft + 'px'
      if (curTimes === times) {
        this.imgCon.style.marginLeft = targetLeft + 'px'
        clearInterval(this.timer)
      }
    }, this.tick);
  }
  render() {
    const imgs = this.props.imgSrcs.map(src => <img style={{
      width: this.props.width,
      height: this.props.height,
      float: 'left'
    }} key={src} src={src} alt="" />)
    return (
      <div ref={this.imgConRef} style={{
        width: this.props.imgSrcs.length * this.props.width,
        height: this.props.height,
      }}>
        {imgs}
      </div>
    )
  }
}
