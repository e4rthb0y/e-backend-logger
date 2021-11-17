const mongoose = require('mongoose');

async function run() {
  const uri = `${process.env.DB_URI}/${process.env.DB_DATABASE}`;
  await mongoose.connect(uri);

  // Create Schemas
  const Application = require('./Application');
  const Authorization = require('./Authorization');
  const Log = require('./Log');

  // Add token to authorizations collection if collection is empty
  mongoose.connection.db
    .collection('authorizations')
    .count(function (err, count) {
      if (err) console.dir(err);

      if (count === 0) {
        const njwt = require('njwt');

        const signingkey = process.env.APP_KEY.toString('base64');

        const claims = {
          iss: process.env.APP_URL,
        };

        // Authorization token
        const jwt = njwt.create(claims, signingkey);

        const authorization = new Authorization({
          token: jwt.compact(),
        });

        authorization.save();
        console.log('Added record into authorization collection succesfully.');
      }
    });
}

module.exports = async function () {
  await run().catch(console.dir);
};
