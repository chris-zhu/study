/* eslint "react-hooks/exhaustive-deps": "off" */

import {
  useEffect
} from 'react'

export default (fn, wait) => {
  useEffect(() => {
    let timer = setInterval(fn, wait);
    return () => {
      clearInterval(timer)
    };
  }, [])
}