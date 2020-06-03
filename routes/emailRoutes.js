const requireLogin = require("../middleware/requireLogin");
const emailController = require("../controllers/emailController")
//EMAIL ROUTES
module.exports = (app) => {
  app.post("/api/email", requireLogin, emailController.sendEmail);
};
