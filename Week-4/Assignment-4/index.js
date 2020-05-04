// Promise
function delayedResultPromise(n1, n2, delayTime) {
  // your code here …
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(`${n1 + n2} (${n1}+${n2})`);
    }, delayTime);
  });

}
delayedResultPromise(4, 5, 3000).then(console.log) // 9 (4+5) will be shown in the console after 3 seconds

// async / await
async function main(cb) {
  // your code here, you should call delayedResultPromise here and get the result using async / await.
  const result = await cb();
  console.log(result);
}
main(() => { return delayedResultPromise(-5, 10, 2000) }); // result will be shown in the console after <delayTime> seconds

