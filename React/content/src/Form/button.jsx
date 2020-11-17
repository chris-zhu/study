import React from 'react'
import { Consumer } from './content'

export default function button(props) {
  return (

    <Consumer>
      {ctx => {
        return (
          <button onClick={
            ctx.submit && ctx.submit()
          }>
            {props.children}
          </button>
        )
      }}
    </Consumer>

  )
}
