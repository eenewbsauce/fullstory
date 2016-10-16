'use strict';

let request         = require('request');
let anyArgs         = require('anyargs');

let envToken        = process.env.FULLSTORY_TOKEN;
let endpoint        = 'https://www.fullstory.com/api/v1/sessions';
let deps =  {
  request: request
};
let argsMetadata = {
    params: {
      type: 'object',
      required: true
    },
    token: {
      type: 'string',
      required: false,
      defaultValue: envToken
    },
    cb: {
      type: 'function',
      required: false,
      defaultValue: function(){}
    }
};

module.exports = {
  create: function() {
    return new FullStory()
  },
  deps: deps,
  argsMetadata: argsMetadata
};

function FullStory(){}

FullStory.prototype.getSessions = function getSessions(params, token, callback) {
  let args = anyArgs(arguments, argsMetadata);

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
