'use strict';

let fullStory = require('../');
let result;
let error;
let interval;

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
    console.log(err)
    err = err;
  });

 interval = setInterval(() => {
    if (result) {
      console.log(result);
      clearInterval(interval);
    } else if (error) {
      console.log(error);
      clearInterval(interval);
    }
  }, 50);
