const mongoose = require("mongoose");
const { Schema } = mongoose;
const NoteSchema = new Schema({
  content: String,
  tag: {type: String,
  default: "inbox"},
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("notes", NoteSchema);
