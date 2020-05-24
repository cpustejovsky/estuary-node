const projectController = require("../controllers/projectController");
const requireLogin = require("../middleware/requireLogin");

module.exports = (app) => {
  app.get("/api/projects", requireLogin, projectController.getProjects);
  app.get(
    "/api/projects/done",
    requireLogin,
    projectController.getCompletedProjects
  );
  app.get("/api/projects/show/:id", requireLogin, projectController.getProject);
  app.post("/api/projects", requireLogin, projectController.createProject);
  app.patch("/api/projects", requireLogin, projectController.updateProject);
  app.patch(
    "/api/projects/done",
    requireLogin,
    projectController.markProjectComplete
  );
  app.delete(
    "/api/projects/:id",
    requireLogin,
    projectController.deleteProject
  );
};
