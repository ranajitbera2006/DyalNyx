import React, { useState } from "react";
import { useSkills } from "../hooks/useSkills";

export const SkillsManager = () => {
  const {
    skillGroups,
    loading,
    error,
    fetchSkills,
    addSkillGroup,
    updateSkillGroup,
    deleteSkillGroup,
  } = useSkills();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setSkillsInput("");
  };

  const startEdit = (group) => {
    setEditingId(group._id);
    setTitle(group.title || "");
    setDescription(group.description || "");
    setSkillsInput(Array.isArray(group.skills) ? group.skills.join(", ") : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    const res = await deleteSkillGroup(id);
    if (!res.success) alert(res.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return alert("Title and description are required.");
    }

    setSubmitting(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      skills: skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const res = editingId
      ? await updateSkillGroup(editingId, payload)
      : await addSkillGroup(payload);

    setSubmitting(false);

    if (res.success) {
      resetForm();
    } else {
      alert(res.error || "Operation failed.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">
        {editingId ? "Update Skill Category" : "Manage Skill Categories"}
      </h1>
      <p className="text-center text-gray-400 text-sm mb-8">
        Group your technical abilities into organized skill sets
      </p>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#10141d] border border-gray-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-2">
            Category Title
          </label>
          <input
            type="text"
            placeholder="e.g., Frontend Development, Cloud & DevOps..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-full bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-2">
            Description
          </label>
          <input
            type="text"
            placeholder="e.g., Core tools and frameworks used to build web applications..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-full bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-2">
            Skills (Comma Separated)
          </label>
          <input
            type="text"
            placeholder="e.g., React.js, Tailwind CSS, TypeScript, Next.js"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            className="w-full px-5 py-3.5 rounded-full bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm transition"
          />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm transition shadow-lg shadow-blue-600/20"
          >
            {submitting
              ? "Saving..."
              : editingId
                ? "Save Changes"
                : "Add Category"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 rounded-full bg-[#1b222d] border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Category Cards List */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 pl-1">
          Registered Categories ({skillGroups.length})
        </h2>

        {loading ? (
          <div className="text-center py-12 text-gray-400">
            Loading skills...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400 bg-red-950/20 border border-red-900/40 rounded-2xl">
            <p className="mb-2">Failed to load skills: {error}</p>
            <button
              onClick={fetchSkills}
              className="px-4 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs border border-red-800"
            >
              Retry
            </button>
          </div>
        ) : skillGroups.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-[#10141d] rounded-2xl border border-gray-800">
            No skill categories added yet. Create one above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <div
                key={group._id}
                className="bg-[#10141d] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-700 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {group.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(group)}
                        className="p-2 rounded-lg bg-[#161d26] border border-gray-700 text-blue-400 hover:bg-blue-600 hover:text-white transition text-xs"
                        title="Edit Group"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(group._id)}
                        className="p-2 rounded-lg bg-[#1f1619] border border-red-950 text-red-400 hover:bg-red-600 hover:text-white transition text-xs"
                        title="Delete Group"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/80">
                  {group.skills?.length > 0 ? (
                    group.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1 text-xs font-medium rounded-full bg-[#18202c] border border-gray-700 text-gray-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-600 italic">
                      No skills listed in this category
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
