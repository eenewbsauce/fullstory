'use strict';

let envToken = process.env.FULLSTORY_TOKEN;

module.exports = {
  decipherArguments: decipherArguments
}

let dummyCallback = function() {};

function decipherArguments(args, metadata) {
  if (typeof args === 'undefined' || typeof metadata === 'undefined') {
    throw new Error('helper::arguments::decipherArguments:: missing args or metadata parameter');
  }

  if (requiredParamsNotSupplied(args, metadata)) {
    throw new Error('helper::arguments::decipherArguments:: missing required parameter in args');
  }

  let output = {
    token: envToken,
    cb: dummyCallback
  };

  switch(true) {
    case args.length === 3:
      if (typeof args[2] === 'function') {
        output.cb = args[2];
      } else if (typeof args[2] === 'object') {
        output.params = args[2];
      } else if (typeof args[2] === 'string') {
        output.token = args[2];
      }
    case args.length >= 2:
      if (typeof args[1] === 'string') {
        output.token = args[1];
      } else if (typeof args[1] === 'function') {
        output.cb = args[1];
      } else if (typeof args[1] === 'object') {
        output.params = args[1];
      }
    case args.length >= 1:
      if (typeof args[0] === 'object') {
        output.params = args[0];
      } else if (typeof args[0] === 'function') {
        output.cb = args[0];
      } else if (typeof args[0] === 'string') {
        output.token = args[0];
      }
  }

  if (validOutput(output, metadata)) {
    return output;
  }

  throw new Error('helper::arguments::decipherArguments:: malformed output, possible duplication of single parameter');
}
//private
function requiredParamsNotSupplied(args, metadata) {
  Object.keys(metadata).every(key => {
    let isPresent = false;

    if (metadata[key].required) {
      for (let i = 0; i < args.length; i++) {
          if (typeof args[i] === metadata[key].type) {
            isPresent = true;
            continue;
          }
      };
    } else {
      isPresent = true;
    }

    return isPresent;
  });
}

function validOutput(output, metadata) {
  return Object.keys(metadata).every(key => {
    return typeof output[key] !== 'undefined' &&
      typeof output[key] === metadata[key].type;
  });
}
