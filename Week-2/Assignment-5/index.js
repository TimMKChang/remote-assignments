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
// const unsort = getRandomNumberArray(10000);
// console.log('sort:');
// console.log(unsort);

// console.time('selection sort');
// console.log(selectionSort(unsort));
// console.timeEnd("selection sort");

// console.log('');

// console.time('quick sort');
// console.log(quickSort(unsort, 0, unsort.length - 1));
// console.timeEnd("quick sort");

const count = 1000;
let record = 0;
console.time('average');
for (let i = 0; i < count; i++) {

  let unsort = getRandomNumberArray(Math.floor(Math.pow(1.2, 1) * 10000));
  let startTime = new Date();
  selectionSort(unsort);
  const a = new Date() - startTime;

  startTime = new Date();
  quickSort(unsort, 0, unsort.length - 1);
  const b = new Date() - startTime;

  unsort = getRandomNumberArray(Math.floor(Math.pow(1.2, 2) * 10000));
  startTime = new Date();
  selectionSort(unsort);
  const c = new Date() - startTime;

  startTime = new Date();
  quickSort(unsort, 0, unsort.length - 1);
  const d = new Date() - startTime;


  record += ((c / d) / (a / b));
}

console.log(record / count)
console.timeEnd('average');
