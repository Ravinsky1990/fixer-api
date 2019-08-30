const AWS = require('aws-sdk');

const options = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
};

AWS.config.update(options);

module.exports = AWS;
