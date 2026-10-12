import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing readable, maintainable, and efficient code by following best practices, proper naming conventions, modular design, and coding standards.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Focused on building fast, efficient, and scalable applications with optimized code and smooth user experiences.",
  },
  {
    icon: Users,
    title: "Colaboration",
    description:
      "Strong team player experienced in working with developers, designers, and stakeholders to deliver high-quality solutions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Passionate about exploring new technologies and creating creative solutions to solve complex problems effectively.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Building the future,{" "}
              <span className="font-serif italic font-normal text-white">
                one component at the time.
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I am a passionate Full Stack MERN Developer and Python Developer
                with a strong interest in building modern, scalable, and
                user-friendly web applications. I enjoy working across the
                entire development stack, from designing responsive front-end
                interfaces with React to developing robust back-end services
                using Node.js, Express.js, MongoDB, and Python-based
                technologies.
              </p>
              <p>
                My academic background reflects my dedication and commitment to
                learning, having achieved 93% in Higher Secondary education.
                This strong foundation has helped me develop analytical
                thinking, problem-solving skills, and a disciplined approach to
                software development. I continuously strive to improve my
                technical expertise through hands-on projects and practical
                experience.
              </p>
              <p>
                I have a genuine enthusiasm for learning new technologies and
                staying up to date with the ever-evolving tech landscape.
                Whether it's exploring new frameworks, development tools, or
                emerging trends in software engineering, I enjoy expanding my
                knowledge and applying it to create innovative solutions. My
                goal is to grow as a developer while contributing to impactful
                projects that make a difference.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "My mission is to develop technology-driven solutions that make
                learning smoother, more interactive, and more accessible for
                students. I aspire to create applications that remove barriers
                to education and empower learners to reach their full
                potential."
              </p>
            </div>
          </div>
          {/* Right-column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl glow-border animation-fade-in"
                style={{ animationDelay: `${(idx + 1) * 1}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-default ">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
