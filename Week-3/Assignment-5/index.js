console.log('twoSum([2, 7, 11, 15], 9)');
console.log(twoSum([2, 7, 11, 15], 9));

console.log('--------------------------');
const testArray = [];
for (let i = 1; i <= 1000; i++) {
  testArray.push(i);
}
const target = 1999;

shuffle(testArray);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let temp = array[i];
    const randomIndex = Math.floor(Math.random() * i);
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

console.time('Brute Force');
console.log(twoSum(testArray, target));
console.timeEnd('Brute Force');

console.time('Two-pass Hash Table');
console.log(twoSum_2_pass(testArray, target));
console.timeEnd('Two-pass Hash Table');

console.time('One-pass Hash Table');
console.log(twoSum_1_pass(testArray, target));
console.timeEnd('One-pass Hash Table');

// Brute Force
function twoSum(nums, target) {
  // your code here
  for (let i = 0; i < nums.length - 1; i++) {

    for (let j = i; j < nums.length; j++) {

      if (nums[i] + nums[j] === target) {
        return [i, j];
      }

    }

  }
  return -1;
}
/*
For example:
twoSum([2, 7, 11, 15], 9);
Should returns:
[0, 1]
Because:
nums[0]+nums[1] is 9
*/

// Two-pass Hash Table
function twoSum_2_pass(nums, target) {

  const hash_table = {};
  for (let i = 0; i < nums.length; i++) {
    hash_table[nums[i]] = i;
  }

  for (let i = 0; i < nums.length; i++) {
    if (hash_table[target - nums[i]] !== undefined) {
      if (hash_table[target - nums[i]] !== i) {
        return [i, hash_table[target - nums[i]]];
      }
    }
  }

  return -1;
}

// One-pass Hash Table
function twoSum_1_pass(nums, target) {
  const hash_table = {};

  for (let i = 0; i < nums.length; i++) {
    if (hash_table[target - nums[i]] !== undefined) {
      return [hash_table[target - nums[i]], i];
    }
    hash_table[nums[i]] = i;
  }

  return -1;
}

// ----------------------------------------------------------
console.log('--------------------------');
const quickSort = require('../../Week-2/Assignment-5/quickSort');

// compare_twoSum();

function compare_twoSum() {
  console.time('get twoSum ratios');
  // test_twoSum(twoSum, 2, 10000, 10);
  barChart(test_twoSum(twoSum, 2, 5000, 100), 4, 41, 0.1);
  console.timeEnd('get twoSum ratios');

  console.time('get twoSum_1_pass ratios');
  // test_twoSum(twoSum_1_pass, 2, 100000, 100);
  barChart(test_twoSum(twoSum_1_pass, 2, 100000, 100), 2, 41, 0.1);
  console.timeEnd('get twoSum_1_pass ratios');

  console.time('get twoSum_2_pass ratios');
  // test_twoSum(twoSum_2_pass, 2, 100000, 100);
  barChart(test_twoSum(twoSum_2_pass, 2, 100000, 100), 2, 41, 0.1);
  console.timeEnd('get twoSum_2_pass ratios');
}

function test_twoSum(test_func, n_ratio, arr_length, count) {
  const ratios = [];

  const testArray = getArray(arr_length);
  const target = arr_length * 2 - 1;

  const testArray2 = getArray(arr_length * n_ratio);
  const target2 = arr_length * n_ratio * 2 - 1;

  for (let i = 1; i <= count; i++) {
    // first
    let startTime = new Date();
    test_func(testArray, target);
    const time_1 = new Date() - startTime;

    // second
    startTime = new Date();
    test_func(testArray2, target2);
    const time_2 = new Date() - startTime;

    ratios.push(Math.round(time_2 / time_1 * 10) / 10);
  }

  // for printing out in ascendent order 
  quickSort(ratios, 0, ratios.length - 1);

  const record = {};
  ratios.forEach(ratio => {
    // ignore too big
    if (ratio > n_ratio * 10) {
      return;
    }

    // for sort order (integers without point are smaller than those with point)
    if (ratio % 1 === 0) {
      ratio = `${ratio}.0`;
    }

    if (!record[ratio]) {
      record[ratio] = 1;
    } else {
      record[ratio]++;
    }

  })
  console.log(record);
  const record_sum = Object.values(record).reduce((a, b) => a + b, 0);
  console.log(`${record_sum} / ${count} (record / count)`);

  return record;
}

function getArray(num) {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
}

// draw barchart
function barChart(data, median, range_num, interval) {
  const cumulative = [];

  for (let i = 0; i < range_num; i++) {
    cumulative.push(0);
  }

  for (let prop in data) {
    const index = +((+prop - median) / interval + Math.floor(range_num / 2)).toFixed(0);
    if (index >= 0 && index < range_num) {
      cumulative[index] = data[prop];
    }
  }

  draw(cumulative, median);
}

function draw(arr, median) {
  let max = Math.max(...arr);

  // for too many data
  const max_top = 50;
  const ratio = max / max_top;
  if (ratio > 1) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.round(arr[i] / ratio);
    }
    max = Math.max(...arr);
  }

  let draw = '';
  for (let i = max; i > 0; i--) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] >= i) {
        draw += '███';
      } else {
        draw += '   ';
      }
    }
    draw += '\n';
  }

  // bottom line show median
  for (let j = 0; j < arr.length; j++) {
    const median_index = Math.floor(arr.length / 2);
    if (j === median_index) {
      if (median % 1 === 0) {
        draw += `${median}.0`;
      } else {
        draw += `${median}`;
      }
    } else {
      draw += '   ';
    }
  }

  console.log(draw)
}
