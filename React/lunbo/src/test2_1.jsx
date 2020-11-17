import React from 'react'

export default function test2_1(props) {
  return (
    <div>
      <input
        type="text"
        value={props.tempValue}
        onChange={props.tempValueChange}
      />
    </div>
  )
}
