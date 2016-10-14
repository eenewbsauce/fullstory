let fullStory = require('../');
let result;
let err;
let interval;

fullStory.getSessions({uid: 239737})
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