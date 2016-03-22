//firstasync.js

"use strict";

var fs = require('fs');

try {
  fs.readFile(process.argv[2], "utf8", (err, text) => {
    if (err) {
      throw err;
  } else {
    console.log(text.split("\n").length - 1);
  }
  });
} catch (e) {
  console.error(e);
}


