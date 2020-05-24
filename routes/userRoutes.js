const userController = require("../controllers/userController");
const requireLogin = require("../middleware/requireLogin");
module.exports = (app) => {
  app.put("/api/user", requireLogin, userController.updateUser);
  app.delete("/user", userController.deleteUser);
};
