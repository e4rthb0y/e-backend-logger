const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const { Schema, model } = mongoose;

const logSchema = new Schema(
  {
    application_id: ObjectID,
    type: { type: String, enum: ['error', 'info', 'warning'] },
    priority: {
      type: String,
      enum: ['lowest', 'low', 'medium', 'high', 'highest'],
    },
    path: String,
    message: String,
    request: {
      data: Object,
    },
    response: {
      data: Object,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Log = model('Log', logSchema);

module.exports = Log;
