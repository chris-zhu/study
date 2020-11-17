import React from 'react'
import Swiper from './components/Swiper'
import img1 from './assets/imgs/img_001.png'
import img2 from './assets/imgs/img_002.png'
import img3 from './assets/imgs/img_003.png'
import img4 from './assets/imgs/img_004.png'
import img5 from './assets/imgs/img_005.png'
import './app.css'

export default function app() {
  return (
    <div className='container'>
      <Swiper width={520} height={280} imgSrcs={[img1,img2,img3,img4,img5]} autoDuration={2000} duration={500}/>
    </div>
  )
}
