const userController = require("../controllers/userController");
const requireLogin = require("../middleware/requireLogin");
module.exports = (app) => {
  app.get("/api/user", requireLogin, userController.fetchUser)
  app.patch("/api/user", requireLogin, userController.updateUser);
  app.delete("/api/user/:id", userController.deleteUser);
};
