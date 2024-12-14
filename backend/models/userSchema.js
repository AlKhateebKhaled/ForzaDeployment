const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  address: {
    type: String,
    trim: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "6700470799d23d0502f6318a",
  },
  accountStatus: {
    type: String,
    enum: ["active", "locked", "suspended"],
    default: "active",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  socialMedia: {
    type: String,
    trim: true,
    default: "",

  },
  bio: {
    type: String,
    maxlength: 250,
    default: "",

  },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
