# FullStory
The FullStory SDK for API version 1 supporting both Promise and Callback styles.

## NPM

Official home on NPM: [https://www.npmjs.com/package/fullstory](https://www.npmjs.com/package/fullstory)

## Github

Official home on Github: [https://github.com/eenewbsauce/fullstory](https://github.com/eenewbsauce/fullstory)

## Setup
1. Install the module

  `npm i fullstory`

2. Add environment variable for authentication (optional)

   `export FULLSTORY_TOKEN={YOUR_TOKEN}`

   or set in `.bashrc`, `.bash_profile`, etc...

3. Require the library

   `let fullStory = require('fullstory');`

4. Query the FullStory API

   *All parameters shown in []
   If uid and email supplied, then API with return union of the two collections

   ***As Callback***
   ```javascript
    let fsParams = {
      uid: number,
      email: string
      limit: number
    }

   fullStory.getSessions(fsParams, [token], [(err, sessions) => {
    console.log(sessions) // [{UserId:123, SessionId: 456, CreatedTime: 1476470464, FsUrl: https://www.fullstory.com...}]
   }])
  ```

  ***As Promise***
  ```javascript
  fullStory.getSessions(fsParams, [token])
    .then(sessions => {
      let sessions = sessions;
    })
    .catch(err => {
      //handle err
    })
  ```

## Tests

### e2e

Fetch sessions for a client by uid
`npm run test-e2e {your_client_uid}`

Fetch sessions for a client by email
`npm run test-e2e {your_client_email}`

Fetch union of sessions for a client with uid and email
`npm run test-e2e {your_client_uid} {your_client_email}`

### Unit Tests

`npm run test`

## Official FullStory API Docs
[http://help.fullstory.com/11269-Develop](http://help.fullstory.com/11269-Develop)
