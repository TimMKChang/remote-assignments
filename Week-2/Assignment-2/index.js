function calculate(args) {
  let result;
  if (args.op === '+') {
    result = args.n1 + args.n2;
  } else if (args.op === '-') {
    result = args.n1 - args.n2;
  } else {
    result = 'Not supported';
  }
  return result;
}
// Try to call calculate function correctly
/*
For example, if we have an add function like this:
function add(args){
return args.n1+args.n2;
}
We can call it by passing an object created by JSON literal:
add({n1:3, n2:4}); // your first way
You should find another way to create a proper object.
// your second way
*/

// 1. object literal
const args_1 = {
  op: '+',
  n1: 3,
  n2: 4
}

console.log('args_1', calculate(args_1))

// 2. new Object()
const args_2 = new Object();
args_2.op = '+';
args_2.n1 = 3;
args_2.n2 = 4;

console.log('args_2', calculate(args_2))

// 3. function & new
function Args_3(op, n1, n2) {
  this.op = op;
  this.n1 = n1;
  this.n2 = n2;
}

const args_3 = new Args_3('+', 3, 4);
console.log('args_3', calculate(args_3))

// 4. Object.create()
const args_4 = Object.create({}, {
  op: {
    value: '+',
    writable: true,
    enumerable: true,
    configurable: true
  },
  n1: {
    value: 3,
    writable: true,
    enumerable: true,
    configurable: true
  },
  n2: {
    value: 4,
    writable: true,
    enumerable: true,
    configurable: true
  }
})

console.log('args_4', calculate(args_4))

// 5. class
class Args_5 {
  constructor(op, n1, n2) {
    this.op = op;
    this.n1 = n1;
    this.n2 = n2;
  }
}

const args_5 = new Args_5('+', 3, 4);
console.log('args_5', calculate(args_5))
