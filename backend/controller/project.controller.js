import mongoose from "mongoose";
import { Projects } from "../model/project.model.js";

const normalizeTags = (tags) => {
  if (!tags) return [];
  let parsed = [];
  if (typeof tags === "string") {
    parsed = tags.split(",").map((t) => t.trim());
  } else if (Array.isArray(tags)) {
    parsed = tags.map((t) => String(t).trim());
  }
  return [...new Set(parsed.filter(Boolean))];
};

export const addProjectController = async (req, res) => {
  try {
    const { title, description, tags, link, github } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Project image is required." });
    }

    if (
      !title?.trim() ||
      !description?.trim() ||
      !link?.trim() ||
      !github?.trim()
    ) {
      return res.status(400).json({ error: "All text fields are required." });
    }

    const newProject = await Projects.create({
      title: title.trim(),
      description: description.trim(),
      tags: normalizeTags(tags),
      link: link.trim(),
      github: github.trim(),
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    return res.status(201).json({ newProject });
  } catch (error) {
    console.error("Error in addProjectController:", error.message);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const updateProjectController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid project ID." });
    }

    const { title, description, tags, link, github } = req.body;
    const updatedData = {};

    if (title !== undefined) updatedData.title = title.trim();
    if (description !== undefined) updatedData.description = description.trim();
    if (link !== undefined) updatedData.link = link.trim();
    if (github !== undefined) updatedData.github = github.trim();
    if (tags !== undefined) updatedData.tags = normalizeTags(tags);

    // If a new image file was provided
    if (req.file) {
      updatedData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedProject = await Projects.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found." });
    }

    return res.status(200).json({ updatedProject });
  } catch (error) {
    console.error("Error in updateProjectController:", error.message);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    const projects = await Projects.find();
    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error in getAllProjectsController:", error.message);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid project ID." });
    }

    const deleted = await Projects.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Project not found." });
    }

    return res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error in deleteProjectController:", error.message);
    return res.status(500).json({ error: "Internal server error!" });
  }
};
