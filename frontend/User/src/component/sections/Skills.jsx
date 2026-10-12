
import { ImSpinner8 } from "react-icons/im";
import { useGetSkills } from "../../hooks/useGetSkills";

export const Skills = () => {
  const { skillCategories = [], loading } = useGetSkills();

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
            Technical Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
            Tools &amp; technologies that{" "}
            <span className="font-serif italic font-normal text-white">
              power my work.
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 animate-fade-in animation-delay-200">
            A comprehensive overview of the programming languages, frameworks,
            and developer tooling I use to craft reliable software.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-primary">
            <ImSpinner8 className="animate-spin w-10 h-10" />
          </div>
        ) : skillCategories.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 text-muted-foreground border border-white/5 rounded-2xl glass">
            <p>No technical skills published yet.</p>
          </div>
        ) : (
          /* Skills Grid */
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((cat, idx) => (
              <div
                key={cat._id || idx}
                className="glass p-8 rounded-2xl border border-primary/30 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 group flex flex-col justify-between"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                {/* Category Title & Description */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                    <h3 className="text-xl font-semibold text-secondary-foreground">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {(cat.skills || []).map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-xl border border-white/5 hover:border-primary/40 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
