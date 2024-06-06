// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
});

module.exports = mongoose.model('User', userSchema);
