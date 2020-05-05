const mongoose = require("mongoose");
const { Schema } = mongoose;
const DependentSchema = new Schema({
  name: String,
  description: String,
  email: String,
});

module.exports = DependentSchema