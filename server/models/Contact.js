const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  status: { type: String, default: 'new' }
}, { timestamps: true });
module.exports = mongoose.model('Contact', schema);
