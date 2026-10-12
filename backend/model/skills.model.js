import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const Skills = mongoose.model("Skills", skillsSchema);
