module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "User must be logged in" });
  } else {
    next();
  }
  // TODO: figure out which approach is better
  // if (req.isAuthenticated()) {
  //   return next();
  // }
  // res.redirect("/login");
};
