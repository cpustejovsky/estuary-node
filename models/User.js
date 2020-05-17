//require in mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FreeWriteSchema = require("./FreeWrite");
const NoteSchema = require("./Note");
const ProjectSchema = require("./Project");

//set up a Schema
const UserSchema = new Schema({
  googleId: String,
  accessToken: String,
  refreshToken: String,
  githubId: String,
  email: String,
  firstName: String,
  lastName: String,
  displayName: String,
  age: Number,
  emailUpdates: { type: Boolean, default: false },
  freeWrites: [FreeWriteSchema],
  notes: [NoteSchema],
  projects: [ProjectSchema]
});

mongoose.model("users", UserSchema);
