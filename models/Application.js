const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const applicationSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Application = model('Application', applicationSchema);

module.exports = Application;
