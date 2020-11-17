import {
  useState,
  useEffect
} from 'react'
import getData from '../data/getData.js'

export default (page = 1, pageSize = 20) => {
  const [resp, setresp] = useState([])
  useEffect(() => {
    (async () => {
      let data = await getData({
        page,
        pageSize
      })
      setresp(data.data)
    })()
  }, [page, pageSize])
  return resp
}