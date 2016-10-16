'use strict';

let envToken = process.env.FULLSTORY_TOKEN;

module.exports = {
  decipherArguments: decipherArguments
}

let dummyCallback = function() {};

function decipherArguments(args) {
  if (typeof args === 'undefined') {
    throw new Error('helper::arguments::decipherArguments:: missing args parameter');
  }

  if (fsParamsNotSupplied(args)) {
    throw new Error('helper::arguments::decipherArguments:: missing fsParam in args. Object with uid or email required');
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

  if (validOutput(output)) {
    return output;
  }

  throw new Error('helper::arguments::decipherArguments:: malformed output, possible duplication of single parameter');
}
//private
function fsParamsNotSupplied(args) {
  var notSupplied = true;

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      notSupplied = false;
      continue;
    }
  }

  return notSupplied;
}

function validOutput(output) {
  if (typeof output.cb === 'function' &&
      typeof output.params === 'object' &&
      typeof output.token === 'string') {

      return true;
  }

  return false;
}
