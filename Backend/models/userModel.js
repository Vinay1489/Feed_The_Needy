const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { type } = require("os");

//name,email,photo,password,passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A User must have a name"],
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
    enum: ["donor", "volunteer", "admin"],
    default: "donor",
  },
  organizationName: {
    type: String,
    required: function () {
      return this.role === "admin";
    },
  },
  registrationNumber: {
    type: String,
    required: function () {
      return this.role === "admin";
    },
    unique: true,
    sparse:true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  transportMode: {
    type: String,
    enum: ["van", "bike", "car", "walk"],
    required: function () {
      return this.role === "volunteer";
    },
  },

  availability: {
    type: String,
    enum: ["weekdays", "weekends", "anytime"],
    required: function () {
      return this.role === "volunteer";
    },
  },
  city: String,
  state: String,
  zipCode: String,
  website: String,

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

userSchema.pre("save", async function (next) {
  //Only run this function if the password was actually modified
  if (!this.isModified("password")) {
    return next();
  }

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  //this points to the current Query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //console.log(changedTimeStamp,JWTTimestamp);
    return JWTTimestamp < changedTimeStamp;
  }

  //FLASE means not changed the password
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
