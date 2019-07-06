const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FreeWriteSchema = new Schema({
  title: String,
  content: String,
  date: Date
});

module.exports = FreeWriteSchema;
