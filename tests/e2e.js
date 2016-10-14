let fullStory = require('../');
let result;
let interval;

fullStory.getSessions({uid: 83529})
  .then(data => {
    result = data;
  });

 interval = setInterval(() => {
    if (result) {
      console.log(result);
      clearInterval(interval);
    }
  }, 50);