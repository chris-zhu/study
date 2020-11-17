var array = [1, 3, 56, 72, 4, 7, 8, 22]


function quickSort(arr) {
  if (arr == null || arr.length == 0) return []
  var leader = arr[0]
  var left = []
  var right = []
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < leader) left.push(arr[i])
    else right.push(arr[i])
  }
  left = quickSort(left)
  right = quickSort(right)
  left.push(leader)
  return left.concat(right)
}

console.log(quickSort(array));