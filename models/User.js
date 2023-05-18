const mongoose = require('mongoose');

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon.
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 4, max: 255 },
  email: { type: String, required: true, min: 6, max: 255 },
  password: { type: String, required: true, min: 4, max: 1024 },
  date: { type: Date, default: Date.now },
  // isadmin: { type: Boolean, required: true },
});
// Tehdään skeemasta model
const User = mongoose.model('User', UserSchema);

// exportataan model
module.exports = User;
