import React, {
  useState,
  useEffect
} from 'react'
import useGetdata from "./hook/useGetdata.js";

export default function Test() {
  const resp = useGetdata(1,20)
  const list = resp.map(ele=><p key={ele._id}>{ele.name}</p>)
  return (
    <div>
      {list}
    </div>
  )
}
