import {
  useState
} from 'react'

export default (reducer, initialState) => {
  const [state, setstate] = useState(initialState)

  function dispatch(action) {
    const newState = reducer(state, action)
    setstate(newState)
  }

  return [state, dispatch]
}
