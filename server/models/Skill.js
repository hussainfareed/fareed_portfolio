const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String, category: String, level: Number, color: String
}, { timestamps: true });
module.exports = mongoose.model('Skill', schema);
