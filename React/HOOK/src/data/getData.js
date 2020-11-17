import axios from "axios";

const url = 'http://shop-dev.zoombin.com/api/mall/products/list'

export default function (params) {
  let data = Object.assign({}, {
    userId: '5ddde01e9d036444d5084b47',
    project: 'zongbin',
    admin: true,
    keyword: '',
    page: 0,
    pageSize: 20
  }, params)
  return new Promise((resolve, reject) => {
    axios.get(
      url, {
        params: data
      }
    ).then(res => {
      resolve(res.data.data)
    })
  })
}