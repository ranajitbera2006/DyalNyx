import React from "react";
import { bufferToBase64 } from "../hooks/useProjects";

export const ProjectList = ({ projects, loading, onDelete, onEdit }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-10 tracking-tight">
        Your Project List
      </h1>

      <div className="bg-[#10141d] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Table Header (Hidden on mobile screens) */}
        <div className="hidden md:grid grid-cols-12 px-6 py-4 border-b border-gray-800 text-sm font-semibold text-gray-400">
          <div className="col-span-1">SI no.</div>
          <div className="col-span-4">Project Title</div>
          <div className="col-span-2 text-center">Preview</div>
          <div className="col-span-3 text-center">Action</div>
          <div className="col-span-2 text-right text-red-500">Delete</div>
        </div>

        {/* Loading / Empty States */}
        {loading && (
          <div className="text-center py-12 text-gray-400">
            Loading projects...
          </div>
        )}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects added yet.
          </div>
        )}

        {/* Project List Items */}
        <div className="divide-y divide-gray-800/60">
          {projects.map((proj, idx) => {
            const imgSrc = bufferToBase64(proj.image);

            return (
              <div
                key={proj._id}
                className="hover:bg-[#151c27] transition-colors p-4 sm:px-6 sm:py-4"
              >
                {/* 1. Mobile Card Layout (< md screens) */}
                <div className="flex md:hidden flex-col gap-3">
                  <div className="flex items-start gap-3">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={proj.title}
                        className="w-16 h-14 object-cover rounded-lg border border-gray-700 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-14 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-500 shrink-0">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                        <p className="text-white font-medium text-sm truncate">
                          {proj.title}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-800/60">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 hover:bg-emerald-600 hover:text-white transition"
                    >
                      Live Link ↗
                    </a>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(proj)}
                        className="p-2 rounded-lg bg-[#1a2332] text-blue-400 border border-gray-700 hover:bg-blue-600 hover:text-white transition text-xs"
                        title="Edit Project"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(proj._id)}
                        className="p-2 rounded-lg bg-[#1b1920] border border-red-950/60 text-red-500 hover:bg-red-600 hover:text-white transition text-xs"
                        title="Delete Project"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Desktop Tabular Grid Layout (>= md screens) */}
                <div className="hidden md:grid grid-cols-12 items-center">
                  {/* SI No */}
                  <div className="col-span-1 text-white font-bold text-base">
                    {idx + 1}
                  </div>

                  {/* Title & Description */}
                  <div className="col-span-4 pr-3">
                    <p className="text-white font-medium text-base truncate">
                      {proj.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {proj.description}
                    </p>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="col-span-2 flex justify-center">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={proj.title}
                        className="w-12 h-10 object-cover rounded border border-gray-700"
                      />
                    ) : (
                      <span className="text-xs text-gray-600">No Image</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="col-span-3 flex items-center justify-center gap-3">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 hover:bg-emerald-600 hover:text-white transition"
                    >
                      Live Link
                    </a>
                    <button
                      onClick={() => onEdit(proj)}
                      className="p-2 rounded-lg bg-[#1a2332] text-blue-400 hover:bg-blue-600 hover:text-white border border-gray-700 transition"
                      title="Edit Project"
                    >
                      ✏️
                    </button>
                  </div>

                  {/* Delete Button */}
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => onDelete(proj._id)}
                      className="p-2.5 rounded-xl bg-[#1b1920] border border-red-950/60 text-red-500 hover:bg-red-600 hover:text-white transition"
                      title="Delete Project"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
