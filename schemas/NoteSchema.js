const mongoose = require("mongoose");
const { Schema } = mongoose;
const NoteSchema = new Schema({
  content: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("notes", NoteSchema);
