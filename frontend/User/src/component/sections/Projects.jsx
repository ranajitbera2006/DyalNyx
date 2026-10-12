import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useState, useEffect } from "react";
import useGetProjects from "../../hooks/useGetProjects";
import { ImSpinner8 } from "react-icons/im";

// Helper to convert MongoDB binary buffer to Base64 data URL
const resolveProjectImage = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (image?.data?.data) {
    const bytes = new Uint8Array(image.data.data);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:${image.contentType};base64,${btoa(binary)}`;
  }
  return "";
};

export const Projects = () => {
  const { projects = [], loading } = useGetProjects();
  const [idx, setIdx] = useState(0);
  const totalProject = projects.length;

  const currentProject = projects[idx] || null;
  const currentImageSrc = currentProject
    ? resolveProjectImage(currentProject.image)
    : "";

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (totalProject <= 1) return;
      if (e.key === "ArrowLeft") {
        setIdx((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setIdx((prev) => Math.min(totalProject - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalProject]);

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      {loading ? (
        <div className="flex justify-center items-center py-28 text-primary">
          <ImSpinner8 className="animate-spin w-10 h-10" />
        </div>
      ) : totalProject === 0 ? (
        <div className="container mx-auto px-6 text-center text-muted-foreground py-20">
          <p>No projects available to display right now.</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mx-auto max-w-2xl mb-10 md:mb-14">
            <span className="text-secondary-foreground text-xs md:text-sm font-semibold tracking-widest uppercase">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3 text-secondary-foreground">
              Projects that{" "}
              <span className="font-serif italic font-normal text-white">
                make an impact.
              </span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Explore my production builds, user-facing tools, and scalable
              applications.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Descriptive Context */}
            <div className="lg:col-span-5 space-y-4 text-muted-foreground text-sm leading-relaxed">
              <h3 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-4 leading-tight">
                Solving real problems,{" "}
                <span className="font-serif italic font-normal text-white">
                  one deployment at a time.
                </span>
              </h3>
              <p>
                I design and build full-stack web applications driven by
                practical utility. Rather than isolated experiments, each build
                represents a fully functional software solution with intentional
                UI architecture.
              </p>
              <p className="hidden md:block">
                From low-latency communications and secure authentication to
                normalized database design and fluid responsive layouts, every
                project is engineered for stability and maintainability.
              </p>
            </div>

            {/* Right Column: Self-Contained Project Card & Navigator */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-xl bg-[#10141d]/90 backdrop-blur-md rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
                {/* Project Image Preview */}
                <div className="relative w-full h-52 sm:h-64 bg-[#0a0d14] overflow-hidden flex items-center justify-center border-b border-gray-800">
                  {currentImageSrc ? (
                    <img
                      key={currentProject._id || idx}
                      src={currentImageSrc}
                      alt={currentProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="text-gray-500 text-xs tracking-wider uppercase font-semibold">
                      No Preview Available
                    </div>
                  )}

                  {/* Top-right index counter pill */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-xs font-semibold text-gray-200">
                    {idx + 1} / {totalProject}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                      {currentProject.title}
                    </h4>

                    {/* Description with scroll prevention */}
                    <p className="text-gray-400 text-sm leading-relaxed max-h-24 overflow-y-auto pr-1">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/80">
                    {(currentProject.tags || []).map((tag, tagId) => (
                      <span
                        key={tagId}
                        className="px-2.5 py-0.5 rounded-full bg-[#18202c] text-xs font-medium border border-gray-700 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions & Links Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      {currentProject.link && (
                        <a
                          href={currentProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {currentProject.github && (
                        <a
                          href={currentProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b222d] hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-semibold transition"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation & Indicator Controls */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => setIdx((prev) => Math.max(0, prev - 1))}
                  className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-gray-400 hover:text-white transition"
                  aria-label="Previous project"
                >
                  <IoIosArrowDropleftCircle className="w-9 h-9" />
                </button>

                {/* Dot Pagination */}
                <div className="flex items-center gap-1.5">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`h-2 rounded-full transition-all ${
                        idx === i
                          ? "w-6 bg-blue-500"
                          : "w-2 bg-gray-700 hover:bg-gray-500"
                      }`}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={idx === totalProject - 1}
                  onClick={() =>
                    setIdx((prev) => Math.min(totalProject - 1, prev + 1))
                  }
                  className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-gray-400 hover:text-white transition"
                  aria-label="Next project"
                >
                  <IoIosArrowDroprightCircle className="w-9 h-9" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
