const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String, company: String, content: String,
  rating: { type: Number, default: 5 },
  approved: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('Testimonial', schema);
