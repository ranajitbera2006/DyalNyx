import React, { useState, useEffect } from "react";
import { bufferToBase64 } from "../hooks/useProjects";

export const ProjectForm = ({ editData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [github, setGithub] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setDescription(editData.description || "");
      setTags(Array.isArray(editData.tags) ? editData.tags.join(", ") : "");
      setLink(editData.link || "");
      setGithub(editData.github || "");
      setPreview(bufferToBase64(editData.image));
    } else {
      setTitle("");
      setDescription("");
      setTags("");
      setLink("");
      setGithub("");
      setImageFile(null);
      setPreview("");
    }
  }, [editData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editData && !imageFile) {
      return alert("Please select a project thumbnail image!");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("link", link);
    formData.append("github", github);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await onSubmit(formData, editData?._id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8 tracking-tight">
        {editData ? "Update Your Project" : "Create Your Project"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
        {/* Upload Thumbnail Box */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
            Thumbnail Image
          </label>
          <label className="flex flex-col items-center justify-center w-full max-w-xs sm:w-72 h-36 border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-2xl cursor-pointer bg-[#111722]/60 hover:bg-[#141b29] transition overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-center p-4">
                <span className="text-3xl text-blue-400 mb-1">☁️</span>
                <span className="text-xs text-gray-400">
                  Click to upload thumbnail
                </span>
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Project Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the project title..."
          required
          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition"
        />

        {/* Project Description */}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the project description or subtitle..."
          required
          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition"
        />

        {/* Project Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Live Project URL (https://...)"
            required
            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition"
          />
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="GitHub Repo URL (https://...)"
            required
            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition"
          />
        </div>

        {/* Tags */}
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated, e.g. React, Node.js, MongoDB)"
          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 font-medium text-white transition shadow-lg text-sm text-center"
          >
            {editData ? "Save Changes" : "Create Project"}
          </button>
          {editData && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition text-sm text-center"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
