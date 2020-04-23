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

module.exports = selectionSort;