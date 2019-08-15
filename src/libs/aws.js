const AWS = require('aws-sdk');

const options = {
  accessKeyId: 
  secretAccessKey:  
};

AWS.config.update(options);

module.exports = AWS;