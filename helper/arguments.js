'use strict';

let envToken = process.env.FULLSTORY_TOKEN;

module.exports = {
  decipherArguments: decipherArguments
}

let dummyCallback = function() {};

function decipherArguments(args, metadata) {
  if (!validInput(args, metadata)) {
    throw new Error('helper::arguments::decipherArguments:: missing args or metadata parameter');
  }

  if (requiredParamsNotSupplied(args, metadata)) {
    throw new Error('helper::arguments::decipherArguments:: missing required parameter in args');
  }

  let output = alignArgsWithMetadata(args, metadata);

  if (validOutput(output, metadata)) {
    return output;
  }

  throw new Error('helper::arguments::decipherArguments:: malformed output, possible duplication of single parameter');
}
//private
function alignArgsWithMetadata(args, metadata) {
  let output = {};

  Object.keys(metadata).forEach(key => {
    let type = metadata[key].type;

    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === type) {
        output[key] = args[i]
        continue;
      } else {
        assignDefaultValue(output, type, key);
      }
    };
  });

  return output;
}

function validInput(args, metadata) {
  return typeof args !== 'undefined' || typeof metadata !== 'undefined';
}

function assignDefaultValue(output, type, key) {
  if (output.hasOwnProperty(key)) return;

  switch (type) {
    case 'string':
      output[key] = envToken;
      break;
    case 'function':
      output[key] = function() {}
      break;
  }
}

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
