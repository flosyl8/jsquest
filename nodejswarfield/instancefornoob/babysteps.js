"use strict"

var sum = 0;

console.log(process.argv);

for (let i = 2; i < process.argv.length; i++) {

  sum += (+ process.argv[i]);
}

console.log(String(sum));

