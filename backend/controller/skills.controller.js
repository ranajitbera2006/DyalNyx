import { Skills } from "../model/skills.model.js";

const normalizeSkills = (skills) => {
  if (typeof skills === "string") {
    return [
      ...new Set(
        skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      ),
    ];
  }
  if (Array.isArray(skills)) {
    return [...new Set(skills.map((s) => String(s).trim()).filter(Boolean))];
  }
  return [];
};

export const addSkillController = async (req, res) => {
  try {
    const { title, description, skills } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res
        .status(400)
        .json({ error: "Title and description are required." });
    }

    const newSkill = await Skills.create({
      title: title.trim(),
      description: description.trim(),
      skills: normalizeSkills(skills),
    });

    return res.status(201).json({ newSkill });
  } catch (error) {
    console.error("Error in addSkillController:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateSkillController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, skills } = req.body;

    const updateFields = {};
    if (title !== undefined) updateFields.title = title.trim();
    if (description !== undefined)
      updateFields.description = description.trim();
    if (skills !== undefined) updateFields.skills = normalizeSkills(skills);

    const updatedSkill = await Skills.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedSkill) {
      return res.status(404).json({ error: "Skill category not found." });
    }

    return res.status(200).json({ updatedSkill });
  } catch (error) {
    console.error("Error in updateSkillController:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteSkillsController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSkill = await Skills.findByIdAndDelete(id);
    if (!deleteSkill) {
      return res.status(400).json({ error: "Skill not found!" });
    }
    return res.status(200).json({ message: "Skill deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteSkillsController", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getAllSkillsController = async (req, res) => {
  try {
    const skillCategories = await Skills.find();
    return res.status(200).json(skillCategories);
  } catch (error) {
    console.log("Error in getAllSkillsController", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};
