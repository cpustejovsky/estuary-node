const mongoose = require("mongoose");
const { Schema } = mongoose;
const NoteSchema = new Schema({
  content: String,
  category: { type: String, default: "inbox"},
  tags: [String],
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("notes", NoteSchema);
