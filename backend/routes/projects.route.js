import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import {
  addProjectController,
  deleteProjectController,
  getAllProjectsController,
  updateProjectController,
} from "../controller/project.controller.js";

const projectsRouter = express.Router();

projectsRouter.get("/getProject", getAllProjectsController);
projectsRouter.post(
  "/addProject",
  upload.single("image"),
  addProjectController,
);
projectsRouter.patch(
  "/updateProject/:id",
  upload.single("image"),
  updateProjectController,
);
projectsRouter.delete("/deleteProject/:id", deleteProjectController);

export default projectsRouter;
