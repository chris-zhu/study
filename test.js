Array.prototype.myCall = function (ctx = window, ...args) {
    ctx.fn = this
    let result = ctx.fn(...args)
    delete ctx.fn
    return result
}
function curry(fn) {
    var args = [].slice.call(arguments, 1)
    return function () {
        var argumentss = Array.from(arguments)
        args = [...args, ...argumentss]
        if (args.length >= fn.length) {
            return fn.apply(null, args)
        }
        args.unshift(fn)
        return curry.apply(null, args)
    }
}

function add(num1, num2) {
    return num1 + num2
}

// console.log(curry(add)(5)(4))

function deepClone(origin, target = {}) {
    for (const key in origin) {
        if (Object.hasOwnProperty.call(origin, key)) {
            if (typeof origin[key] == 'object') {
                if (Object.prototype.toString.call(origin[key]) === '[object Array]') {
                    target[key] = []
                } else {
                    target[key] = {}
                }
                deepClone(origin[key], target[key])
            }
            target[key] = origin[key]
        }
    }
    return target
}

let a = {
    a: 1,
    b: [1, 3, 4, {
        c: 4
    }]
}

console.log(deepClone(a))