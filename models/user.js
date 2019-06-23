//require in mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
//set up a Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
//export
module.exports = mongoose.model("User", UserSchema);
