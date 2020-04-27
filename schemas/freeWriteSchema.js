const mongoose = require("mongoose");
const { Schema } = mongoose;
const FreeWriteSchema = new Schema({
  title: String,
  content: String,
  // date: Date, TODO: Add Date functionality to note taking application
  wordCount: Number,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("free-writes", FreeWriteSchema);
