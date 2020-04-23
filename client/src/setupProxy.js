const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth", "/logout"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
