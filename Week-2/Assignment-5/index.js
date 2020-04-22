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
// const unsort = [10, 8, 9, 2, 6, 5, 7, 3, 1, 4];
const unsort = getRandomNumberArray(20);
console.log(unsort);
console.log(quickSort(unsort));
console.log(selectionSort(unsort));

// compare time consuming
console.log(calculateTime(quickSort, unsort));
console.log(calculateTime(selectionSort, unsort));

function getRandomNumberArray(num) {
  const array = [];

  for (let i = 1; i <= num; i++) {
    array.push(i);
  }

  return shuffle(array);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let temp = array[i];
    const randomIndex = Math.floor(Math.random() * i);
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
// -------------------------------------------------------------
function quickSort(unsort) {
  // create a new array, keep original array the same
  const array = [];
  unsort.forEach(ele => {
    array.push(ele);
  })

  const record = [[0, array.length - 1]];
  while (record[record.length - 1].length > 0) {

    const lastRecord = record[record.length - 1];
    const newReocrd = [];

    for (let i = 0; i < lastRecord.length; i += 2) {

      const low = lastRecord[i];
      const high = lastRecord[i + 1];

      newReocrd.push(...partition(array, low, high));

    }

    record.push(newReocrd);

  }

  return array;
}

function partition(array, low, high) {
  // choose last element as pivot
  const pivot = array[high];
  let i = low;
  let temp;

  while (array[i] < pivot) {
    i++;
  }

  for (let j = i + 1; j < high; j++) {
    if (array[j] < pivot) {
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
    }
  }

  // change index i element and pivot
  temp = array[i];
  array[i] = array[high];
  array[high] = temp;

  // check the remaining part need to partition
  // if one part left one number or none, the part no need to partition again
  let record = [];
  if (i - low > 1) {
    record.push(low, i - 1);
  }
  if (high - i > 1) {
    record.push(i + 1, high);
  }

  return record;
}
// -------------------------------------------------------------
function selectionSort(unsort) {
  const array = [];
  unsort.forEach(ele => {
    array.push(ele);
  })

  const sort_array = [];

  while (array.length > 0) {
    let min = array[0];
    for (let i = 0; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i];
      }
    }
    sort_array.push(min);
    array.splice(array.indexOf(min), 1);
  }

  return sort_array;
}

// -------------------------------------------------------------
function calculateTime(func, args) {
  const startTime = new Date();
  func(args);

  return ((new Date() - startTime) / 1000)
}
