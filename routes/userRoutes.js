const userController = require("../controllers/userController");
const requireLogin = require("../middleware/requireLogin");
module.exports = (app) => {
  app.patch("/api/user", requireLogin, userController.updateUser);
  app.delete("/api/user/:id", userController.deleteUser);
};
