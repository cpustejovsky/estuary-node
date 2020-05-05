const mongoose = require("mongoose");
const DependentSchema = require("./Dependent");
const { Schema } = mongoose;
const NoteSchema = new Schema({
  content: String,
  category: { type: String, default: "in-tray"},
  tags: [String],
  dueDate: Date,
  remindDate: Date,
  dependsOn: [DependentSchema],
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("notes", NoteSchema);
