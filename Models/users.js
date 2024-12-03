const mongoose = require("mongoose");
const slugify = require("slugify");

const UserSchema = new mongoose.Schema({
 userSettings: {
  username: {
   type: String,
   trim: true,
  },
  slug: String,
  profilePicture: {
   type: String,
   default: "",
  },
  //   default: {}
 },
 volSettings: {
  master: {
   type: String,
   default: "0.5",
  },
  music: {
   type: String,
   default: "0.5",
  },
  hitSound: {
   type: String,
   default: "0.2",
  },
 },
 gameSettings: {
  scrollSpeed: {
   type: String,
   default: "10",
  },
  keys: {
   type: String,
   default: "",
  },
  pauseKey: {
   type: String,
   default: "",
  },
  restartKey: {
   type: String,
   default: "",
  },
 },

 song: {
  type: String,
  default: "",
 },
 leaderBoardPos: {
  type: Number,
  trim: true,
  default: 0,
 },

 gameData: {
  playCount: {
   type: Number,
   trim: true,
   default: 0,
  },
  accuracy: {
   type: Number,
   trim: true,
   default: 0,
  },
  performance: {
   type: Number,
   trim: true,
   default: 0,
  },
  maxCombo: {
   type: Number,
   trim: true,
   default: 0,
  },
  SS: {
   default: 0,
   type: Number,
   trim: true,
  },
  S: {
   default: 0,
   type: Number,
   trim: true,
  },
  A: {
   default: 0,
   type: Number,
   trim: true,
  },
 },
});

UserSchema.pre("save", function (next) {
 if (!this.isModified("name")) {
  next();
  return;
 }
 this.slug = slugify(this.name);
 next();
});

module.exports = mongoose.model("users", UserSchema, "users");
