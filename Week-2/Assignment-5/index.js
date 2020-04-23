function binarySearchPosition(numbers, target) {
  // your code here
  let left = 0;
  let right = numbers.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (target === numbers[mid]) {
      return mid;
    } else if (target > numbers[mid]) {
      left = mid + 1;
    } else if (target < numbers[mid]) {
      right = mid - 1;
    }
  }

  return -1;

}
console.log(binarySearchPosition([1, 2, 5, 6, 7], 1)); // should print 0
console.log(binarySearchPosition([1, 2, 5, 6, 7], 6)); // should print 3
// -------------------------------------------------------------
// try quick sort
const quickSort = require('./quickSort.js');
const selectionSort = require('./selectionSort.js');
const getRandomNumberArray = require('./getRandomNumberArray.js')

// const unsort = [10, 8, 9, 2, 6, 5, 7, 3, 1, 4];
const unsort = getRandomNumberArray(20);
console.log('sort:');
console.log(unsort);
console.log('selection sort:');
console.log(selectionSort(unsort));
console.log('quick sort:');
console.log(quickSort(unsort, 0, unsort.length - 1));

// compare time consuming
// console.log('selection sort used time:');
// console.log(calculateTime(selectionSort, unsort));
// console.log('quick sort used time:');
// console.log(calculateTime(quickSort, unsort));

// -------------------------------------------------------------
function calculateTime(func, args) {
  const startTime = new Date();
  func(args);

  return ((new Date() - startTime) / 1000)
}
