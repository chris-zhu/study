var array = [1, 3, 56, 72, 4, 7, 8, 22]

function swap(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function quickSort2(arr, begin, end) {
  if (begin >= end - 1) return
  var left = begin
  var right = end
  do {
    do {
      left++
    } while (left < right && arr[left] < arr[begin]);
    do {
      right--
    } while (left < right && arr[right] > arr[begin]);
    if (left < right) {
      swap(arr, left, right)
    }
  } while (left < right);
  var swapPoint = left == right ? right - 1 : right
  swap(arr, begin, swapPoint)
  quickSort2(arr, begin, swapPoint)
  quickSort2(arr, swapPoint + 1, end)
}

function quickSort(arr) {
  quickSort2(arr, 0, arr.length)
}

quickSort(array)
console.log(array);