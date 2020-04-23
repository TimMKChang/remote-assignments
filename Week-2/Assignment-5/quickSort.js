function quickSort(array, low, high) {

  // const i = partition(array, low, high);

  // if (i - low > 1) {
  //   quickSort(array, low, i - 1);
  // }
  // if (high - i > 1) {
  //   quickSort(array, i + 1, high);
  // }

  if (low < high) {
    const i = partition(array, low, high);
    quickSort(array, low, i - 1);
    quickSort(array, i + 1, high);
  }

  return array;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function partition(array, low, high) {
  // choose last element(high) as pivot
  let i = low;

  // use i and j to divide the unsorted array into 2 parts
  while (array[i] < array[high]) {
    i++;
  }

  for (let j = i + 1; j < high; j++) {
    if (array[j] < array[high]) {
      swap(array, i, j);
      i++;
    }
  }

  // change index i element and pivot
  swap(array, i, high);

  return i;
}

module.exports = quickSort;