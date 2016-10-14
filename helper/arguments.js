module.exports = {
  decipherArguments: decipherArguments
}

let dummyCallback = function() {};

function decipherArguments(arguments, envToken) {
  let output = {
    params: {},    
    token: envToken,
    cb: dummyCallback
  };

  switch(arguments.length) {
    case 1:
      output.params = arguments[0];
      break;
    case 2:
      output.params = arguments[0];
      output.token = arguments[1];
      break;
    case 3:
      output.params = arguments[0];
      output.token = arguments[1];
      output.cb = arguments[2];      
  }

  return output;
}