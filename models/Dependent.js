const mongoose = require("mongoose");
const { Schema } = mongoose;
const DependentSchema = new Schema({
  name: String,
  description: { type: String, default: null },
  email: { type: String, default: null },
});

module.exports = DependentSchema;
