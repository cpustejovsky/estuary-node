const mongoose = require("mongoose");
const NoteSchema = require("./Note");
const { Schema } = mongoose;
const ProjectSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
  dueDate: Date,
  remindDate: Date,
  nextActions: [NoteSchema],
  completed: { type: Date, default: null },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("projects", ProjectSchema);
