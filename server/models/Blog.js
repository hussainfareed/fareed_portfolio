const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String, excerpt: String,
  tags: [String], readTime: Number,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  published: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('Blog', schema);
