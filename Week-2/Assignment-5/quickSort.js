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

module.exports = quickSort;