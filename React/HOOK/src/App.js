import React, {
  useState,
  useEffect
} from 'react'
// import Test from "./Test";

import useTimer from "./hook/useTimer";

function Test() {
  useTimer(()=>{
    console.log('111');
  },1000)
  return (
  <div>{0}</div> 
  )
}

export default function () {
  return (
    <div>
      <Test />
    </div>
  )
}
