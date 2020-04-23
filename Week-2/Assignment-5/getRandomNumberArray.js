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

module.exports = getRandomNumberArray;