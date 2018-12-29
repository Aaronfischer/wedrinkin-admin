'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'wedrinkin-admin-glimmer',
    environment
  };

  // Set the host.
  switch(environment) {
    case 'canary':
      ENV.host = '';
      break;
    case 'production':
      ENV.host = 'https://gallant-colden-005516.netlify.com/.netlify/functions';
      break;
    default:
      // ENV.host = '//localhost:8080';
      ENV.host = '//localhost:9000/.netlify/functions';
  };

  return ENV;
};
