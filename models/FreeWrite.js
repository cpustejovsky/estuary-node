const mongoose = require("mongoose");
const { Schema } = mongoose;
const FreeWriteSchema = new Schema({
  title: String,
  content: String,
  date: Date,
  wordCount: Number,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("free-writes", FreeWriteSchema);
