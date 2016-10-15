'use strict';

let fullStory = require('../');
let result;
let err;
let interval;

console.log(JSON.stringify(process.argv, null, 4));
// process.argv['uid'];
// process.argv['email']

fullStory.getSessions()
  .then(data => {
    console.log('success');
    result = data;
  })
  .catch(err => {
    console.log('error');
    err = err;
  });

 interval = setInterval(() => {
    if (result) {
      console.log(result);
      clearInterval(interval);
    } else if (err) {
      console.log(err);
      clearInterval(interval);
    }
  }, 50);
