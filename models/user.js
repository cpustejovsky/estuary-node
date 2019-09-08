//require in mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const FreeWriteSchema = require("../schemas/freeWriteSchema");
const noteSchema = require("../schemas/noteSchema");

//set up a Schema
const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  age: Number,
  emailUpdates: { type: Boolean, default: false },
  freeWrites: [FreeWriteSchema],
  notes: [noteSchema]
});

UserSchema.plugin(passportLocalMongoose);
//export
module.exports = mongoose.model("User", UserSchema);
