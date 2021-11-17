const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const { Schema, model } = mongoose;

const authorizationSchema = new Schema(
  {
    authorization_id: ObjectID,
    token: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Authorization = model('Authorization', authorizationSchema);

module.exports = Authorization;
