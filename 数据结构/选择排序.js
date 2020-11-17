var arr = [1, 3, 56, 72, 4, 7, 8, 22]

function compare(a, b) {
  return a < b
}

function change(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}


/** 每一圈找出一个最大的数放到末尾 */
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    var maxIndex = 0
    for (let j = 0; j < arr.length - i; j++) {
      if (compare(arr[maxIndex], arr[j])) {
        maxIndex = j
      }
    }
    change(arr, maxIndex, arr.length - 1 - i)
  }
}

sort(arr)

console.log(arr);