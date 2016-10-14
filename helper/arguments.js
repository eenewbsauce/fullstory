let envToken = process.env.FULLSTORY_TOKEN;

module.exports = {
  decipherArguments: decipherArguments
}

let dummyCallback = function() {};

function decipherArguments(arguments) {
  let output = {
    params: {},    
    token: envToken,
    cb: dummyCallback
  };

  switch(arguments.length) {
    case 3:
      output.cb = arguments[2];
    case 2:
      output.token = arguments[1];
    case 1:
      output.params = arguments[0];             
  }

  return output;
}