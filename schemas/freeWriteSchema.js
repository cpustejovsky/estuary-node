const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FreeWriteSchema = new Schema({
  title: String,
  content: String,
  // date: Date, TODO: Add Date functionality to note taking application
  wordCount: Number
});

module.exports = FreeWriteSchema;
