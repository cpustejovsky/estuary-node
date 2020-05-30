const requireLogin = require("../middleware/requireLogin");
const freeWriteController = require("../controllers/freeWriteController");
module.exports = (app) => {
  app.get(
    "/api/free-writes",
    requireLogin,
    freeWriteController.fetchFreeWrites
  );
  app.post(
    "/api/free-writes",
    requireLogin,
    freeWriteController.createFreeWrite
  );
  app.delete(
    "/api/free-writes/:id",
    requireLogin,
    freeWriteController.deleteFreeWrite
  );
};
