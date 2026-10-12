import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    github: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Projects = mongoose.model("Projects", projectSchema);
