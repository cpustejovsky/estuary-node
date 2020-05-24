const requireLogin = require("../middleware/requireLogin");
const noteController = require("../controllers/noteController");
module.exports = (app) => {
  app.get(
    "/api/notes/category/:name",
    requireLogin,
    noteController.findNotesByCategory
  );
  app.get(
    "/api/notes/project/:id",
    requireLogin,
    noteController.findNotesByProject
  );
  app.post("/api/notes", requireLogin, noteController.createNote);
  app.patch("/api/notes", requireLogin, noteController.updateNoteCategory);
  app.patch(
    "/api/notes/project",
    requireLogin,
    noteController.attachNoteToProject
  );

  app.patch(
    "/api/notes/:category",
    requireLogin,
    noteController.updateNoteCategory
  );
  app.delete("/api/notes", requireLogin, noteController.deleteNote);
};
