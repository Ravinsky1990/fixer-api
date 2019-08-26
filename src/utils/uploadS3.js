const fs = require('fs');
const path = require('path');
const AWS = require('../libs/aws');

const s3 = new AWS.S3();

module.exports = (folder, file) => new Promise((resolve, reject) => {
  const timestamp = +new Date();
  const filename = `${folder}/${timestamp}${path.extname(file.name)}`;

  s3.upload(
    {
      Bucket: process.env.S3_BUKET_NAME,
      Key: filename,
      Body: fs.createReadStream(file.path),
    },
    (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data.Location);
    },
  );
});