const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // No two users can have the same username
  passwordHash: { type: String, required: true }
  // Stores the hashed (encrypted) password, not the plain password for security
});

module.exports = mongoose.model('User', userSchema);
// This model will interact with the "users" collection in MongoDB 
// (automatic pluralization).