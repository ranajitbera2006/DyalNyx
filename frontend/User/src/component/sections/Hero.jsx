import { ArrowRight, ChevronDown, Download} from "lucide-react";
import { Button, Button2 } from "../components/Button";
import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaPython,
  FaNode,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMongoose,
} from "react-icons/si";
import { TbBrandRedux } from "react-icons/tb";
import TypingAnimation from "../components/TypingAnimation";
const socialLinks = [
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/ranajit-bera-9bb264389",
  },
  {
    icon: FaGithub,
    href: "https://github.com/ranajitbera2006",
  },
];
const skills = [
  { icon: FaHtml5 },
  { icon: FaCss3Alt },
  { icon: SiTailwindcss },
  { icon: IoLogoJavascript },
  { icon: FaReact },
  { icon: TbBrandRedux },
  { icon: FaNode },
  { icon: SiExpress },
  { icon: SiMongodb },
  { icon: SiMongoose },
  { icon: FaPython },
  { icon: FaGitAlt },
 
];
export const Hero = () => {
  const START_YEAR = 2025;
  const years = Math.max(1, new Date().getFullYear() - START_YEAR);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden ">
      {/* Bg */}
      <div className="absolute inset-0">
        <img
          src="hero-bg.jpg"
          alt="Hero Image"
          className="w-full h-full object-cover object-center opacity-40"
        />
      </div>
      <div className="absolute inset-0 bg-radial from-primary/10 via-background/40 to-background pointer-events-none" />
      {/* Green dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text-content */}
          <div className="space-y-2">
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl  font-bold leading-tight animate-fade-in animation-delay-100">
                Hi,I am{" "}
                <span className="text-primary glow-text text-nowrap">
                  Ranajit Bera
                </span>
              </h1>

              <TypingAnimation />
              <br />
            </div>
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <a href="#contact">
                <Button size="lg">
                  Contact Me <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <Button2 size="lg">
                <Download className="w-5 h-5" />
                Download CV
              </Button2>
            </div>
            {/* Social Links */}
            <div className="flex mt-4 ml-3 items-center gap-3 animate-fade-in animation-delay-400">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="inline-flex items-center p-2 text-muted-foreground hover:text-primary glass rounded-full transition-all duration-300 ease-linear shadow-lg shadow-primary/10 hover:shadow-primary/20 focus:ring-primary focus:outline-none"
                >
                  <social.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>
          {/* Right Column - Profile-Image */}
          <div className="relative animate-fade-in animation-delay-300">
            {/* Profile Image */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse" />
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img
                  src="/profile.png"
                  alt="Profile Photo"
                  className="w-full aspect-3/3  rounded-2xl"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
                {/* Stats Badge */}
                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500  ">
                  <div className="text-2xl font-bold text-primary">{years}+</div>
                  <div className="text-xs text-muted-foreground">
                    Years Exp.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Skills sections */}

        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="shrink-0 px-8 py-4">
                  <span className="text-4xl hover:text-primary">
                    <skill.icon />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary-foreground"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
