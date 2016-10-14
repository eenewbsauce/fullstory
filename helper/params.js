'use strict';

module.exports =  {
  convertToQueryString: convertToQueryString
}

function convertToQueryString(params) {
  let output = '';

  Object.keys(params).forEach((key, index) => {
    let querySeperator = index === 0 ? '?' : '&';
    output += `${querySeperator}${key}=${params[key]}`;
  });

  return output;
}
