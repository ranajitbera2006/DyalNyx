import express from "express";
import {
  addSkillController,
  deleteSkillsController,
  getAllSkillsController,
  updateSkillController,
} from "../controller/skills.controller.js";

const skillsRouter = express.Router();

skillsRouter.get("/getSkill", getAllSkillsController);
skillsRouter.post("/addSkill", addSkillController);
skillsRouter.patch("/updateSkill/:id", updateSkillController);
skillsRouter.delete("/deleteSkill/:id", deleteSkillsController);

export default skillsRouter;
