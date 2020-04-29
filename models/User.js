//require in mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FreeWriteSchema = require("../schemas/FreeWrite");
const NoteSchema = require("../schemas/Note");

//set up a Schema
const UserSchema = new Schema({
  googleId: String,
  githubId: String,
  email: String,
  firstName: String,
  lastName: String,
  displayName: String,
  age: Number,
  emailUpdates: { type: Boolean, default: false },
  freeWrites: [FreeWriteSchema],
  notes: [NoteSchema],
});

mongoose.model("users", UserSchema);
