//filteredls.js

"use strict";

var fs = require ('fs');
var path = require('path');

function cbForReaddir(error, arrOfFiles) {
  if (error) {
    throw error;
  }
  arrOfFiles = arrOfFiles.filter( (item) => path.extname(item) === "." + process.argv[3]);
  arrOfFiles.forEach( a => console.log(a));
}

try {
  fs.readdir(process.argv[2], cbForReaddir);
} catch (e) {
  console.error(e);
}