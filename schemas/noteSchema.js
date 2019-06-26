const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: String,
  content: String,
  date: Date
});

module.exports = NoteSchema;
