const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email , photo , password . passWordConform

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please conform your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password are not the same!'
    }
  }
});
userSchema.pre('save', async function(next) {
  // Only Run This Function If The PAssword Is Mdified
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
  // Remove Conform PassWord Not To Save In DB
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
