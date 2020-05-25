module.exports = (req, res, next) =>
  req.isAuthenticated()
    ? next()
    : res.status(401).send({ error: "User must be logged in" });
