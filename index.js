let request         = require('request');
let format          = require('util').format;

let helper          = require('./helper')
let paramsHelper    = helper.params;
let argumentsHelper = helper.arguments;

let endpoint        = 'https://www.fullstory.com/api/v1/sessions';

module.exports = new FullStory();

function FullStory(){}

FullStory.prototype.getSessions = function getSessions(params, token, callback) {
  let args = argumentsHelper.decipherArguments(arguments);

  return new Promise((resolve, reject) => {
    request({
        url:  format('%s%s', endpoint, paramsHelper.convertToQueryString(args.params)),
        headers: {
            "authorization": "Basic " + args.token,
            "content-type": "application/json"
        }
      }, (err, response) => {
        if (err) {
            reject(err);
            return args.cb(err);
        }

        let fsData;
        
        try {
          fsData = JSON.parse(response.body);
        } catch(err) {
            reject(err);          
            return args.cb(err);
        }

        resolve(fsData);
        args.cb(null, fsData);
      });
  });      
};

