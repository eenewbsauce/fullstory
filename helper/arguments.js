'use strict';

let envToken = process.env.FULLSTORY_TOKEN;

module.exports = {
  decipherArguments: decipherArguments
}

let dummyCallback = function() {};

function decipherArguments(args) {
  if (typeof args === 'undefined') {
    throw new Error('helper::arguments::decipherArguments:: missing args param');
  }
  
  let output = {
    params: {},
    token: envToken,
    cb: dummyCallback
  };

  switch(args.length) {
    case 3:
      output.cb = args[2];
    case 2:
      output.token = args[1];
    case 1:
      output.params = args[0];
  }

  return output;
}
