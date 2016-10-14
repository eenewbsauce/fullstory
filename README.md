# FullStory
The FullStory SDK for API version 1 supporting both Promise and Callback styles.

## NPM

Official home on NPM: [https://www.npmjs.com/package/fullstory](https://www.npmjs.com/package/fullstory)

## Github

Official home on Github: [https://github.com/eenewbsauce/fullstory](https://github.com/eenewbsauce/fullstory)

## Setup

1. Add environment variable for authentication

   `export FULLSTORY_TOKEN={YOUR_TOKEN}`

   or set in `.bash_rc`, `.bash_profile`, etc...

2. Require the library

   `let fullStory = require('fullstory');`

3. Query the FullStory API

   *All parameters are optional

As Callback
```javascript
let params = {
  uid: number,
  email: string
  limit: number
}

FullStory.getSessions([params], [token], [(err, sessions) => {
  let sessions = sessions;
}])
```
or

As Promise
```javascript
FullStory.getSessions(params, token)
  .then(sessions => {
    let sessions = sessions;
  })
  .catch(err => {
    //handle err
  })
```
