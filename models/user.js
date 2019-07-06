//require in mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const FreeWriteSchema = require("../schemas/freeWriteSchema");
const Schema = mongoose.Schema;

//set up a Schema
const UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  freeWrites: [FreeWriteSchema]
});

UserSchema.plugin(passportLocalMongoose);
//export
module.exports = mongoose.model("User", UserSchema);
