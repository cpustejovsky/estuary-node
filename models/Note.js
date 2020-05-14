const mongoose = require("mongoose");
const DependentSchema = require("./Dependent");
const { Schema } = mongoose;
const NoteSchema = new Schema({
  content: String,
  category: { type: String, default: "in-tray" },
  tags: [String],
  dueDate: Date,
  remindDate: Date,
  dependsOn: [DependentSchema],
  completed: { type: Boolean, default: false },
  completedDate: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  _project: { type: Schema.Types.ObjectId, ref: "Project" },
});

mongoose.model("notes", NoteSchema);
