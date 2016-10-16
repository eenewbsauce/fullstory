'use strict';

let request         = require('request');

let argumentsHelper = require('../helper').arguments;

let endpoint        = 'https://www.fullstory.com/api/v1/sessions';
let deps =  {
  request: request
}
module.exports = {
  create: function() {
    return new FullStory()
  },
  deps: deps
};

function FullStory(){}

FullStory.prototype.getSessions = function getSessions(params, token, callback) {
  let args = argumentsHelper.decipherArguments(arguments);

  return new Promise((resolve, reject) => {
    deps.request.post({
        url:  endpoint,
        body: args.params,
        json: true,
        headers: {
            "authorization": "Basic " + args.token,
            "content-type": "application/json"
        }
      }, (err, response, body) => {
        if (err) {
            reject(err);
            return args.cb(err);
        }

        resolve(body);
        args.cb(null, body);
    });
  });
};
