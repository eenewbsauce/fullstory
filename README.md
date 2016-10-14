# fullstory
FullStory SDK for API version 1

## Setup

1. Add environment varibles for authentication

`export FULLSTORY_TOKEN={YOUR_TOKEN}`

or set in `.bash_rc`, `.bash_profile`, etc...

2. Require the library

`let fullStory = require('fullstory');`

3. Query the FullStory API

As callback
```javascript
FullStory.getSessions((err, sessions) => {
  let sessions = sessions;
})
```
or 

As promise
```javascript
FullStory.getSessions
  .then(sessions => {
    let sessions = sessions;
  })
  .catch(err => {
    //handle err
  })
```

