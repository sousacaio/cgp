const express = require("express");
const router = express.Router();
const UsersController = require("./controllers/UsersController");
const ProjectController = require("./controllers/ProjectsController");

router.post('/v1/users/create', UsersController.create);
router.post('/v1/users/auth', UsersController.autentic);
router.put('/v1/users/update', UsersController.update);
router.get('/v1/projects', ProjectController.indexAll);
router.post('/v1/projects/create', ProjectController.create);
router.put('/v1/projects/update/:project_id', ProjectController.update);
router.post('/v1/projects/comment/:project_id', ProjectController.comment);

module.exports = router;
