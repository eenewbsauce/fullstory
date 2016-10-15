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

   *All parameters are optional

   ***As Callback***
   ```javascript
    let fsParams = {
      uid: number,
      email: string
      limit: number
    }

   fullStory.getSessions([fsParams], [token], [(err,      sessions) => {
    let sessions = sessions;
   }])
  ```

  ***As Promise***
  ```javascript
  fullStory.getSessions([fsParams], [token])
    .then(sessions => {
      let sessions = sessions;
    })
    .catch(err => {
      //handle err
    })
  ```

## Official FullStory API Docs
[http://help.fullstory.com/11269-Develop](http://help.fullstory.com/11269-Develop)
