const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { type } = require("os");

//name,email,photo,password,passwordConfirm

const userSchema = new mongoose.userSchema({
  name: {
    type: String,
    required: [true, "A User must have an email"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["donor", "reciever", "admin"],
    default: "admin",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    // select:false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Confirm the Password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same!",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    // select:false,
  },
});

const User = mongoose.mongo.model("User", userSchema);
module.exports = User;
