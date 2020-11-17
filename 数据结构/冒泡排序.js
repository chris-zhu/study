var arr = [1, 3, 56, 72, 4, 7, 8, 22]

function compare(a, b) {
  return a > b
}

function change(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1])) {
        change(arr, j, j + 1)
      }
    }
  }
}

sort(arr)

console.log(arr);