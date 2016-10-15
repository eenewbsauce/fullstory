'use strict';

let fullStory = require('../');
let result;
let err;
let interval;

console.log(JSON.stringify(process.argv, null, 4));


fullStory.getSessions({
  uid: process.argv[2],
  email: process.argv[3]
})
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
