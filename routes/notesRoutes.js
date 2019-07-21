const express = require("express");
const router = express.Router();
// const passport = require("passport");
// const moment = require("moment");
const middleWare = require("../middleware/index.js");
// const FreeWriteChecker = require("../middleware/freeWriteChecker.js");

// const User = require("../models/user");
// const FreeWrite = require("../schemas/freeWriteSchema");

router.get("/", middleWare.isLoggedIn, (req, res) => {
  res.render("notes/index");
});

module.exports = router;
