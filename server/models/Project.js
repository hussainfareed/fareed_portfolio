const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  githubUrl: String,
  liveUrl: String,
  featured: { type: Boolean, default: false },
  category: { type: String, default: 'fullstack' },
  stats: { stars: Number, forks: Number, views: Number }
}, { timestamps: true });
module.exports = mongoose.model('Project', schema);
