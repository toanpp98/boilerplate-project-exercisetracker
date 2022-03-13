const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  exercises : [{ type: mongoose.Types.ObjectId, ref: 'Exercise' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
