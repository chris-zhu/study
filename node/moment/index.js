const moment = require('moment')

const invalidate = ['YYYY-MM-DD HH:mm:ss']

const time = moment.utc('1970-01-01 00:00:0', invalidate, true)

console.log(time.format("YYYY/MM/DD"));