module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send({ error: "User must be logged in" });
};
