let format = require('util').format;

module.exports =  {
  convertToQueryString: convertToQueryString
}

function convertToQueryString(params) {
  let output = '';

  Object.keys(params).forEach((key, index) => {
    let querySeperator = index === 0 ? '?' : '&'; 
    output += format('%=%', key, params[key]);
  });

  return output;
}