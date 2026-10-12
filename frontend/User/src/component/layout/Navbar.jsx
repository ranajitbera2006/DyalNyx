import { Menu, X } from "lucide-react";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isScrolled ? "glass-stronger py-3" : "bg-transparent py-5"}   z-20`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          title="Hi,I am Ranajit Bera"
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary"
        >
          <div className="flex items-center gap-2 cursor-pointer font-bold text-xl tracking-wide">
            <img
              src="/dualnyx1.png"
              alt="User"
              className="w-16 h-11 sm:w-20 sm:h-14 object-contain"
            />
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className={`px-4 py-2  text-muted-foreground rounded-full hover:bg-surface hover:text-foreground `}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* CTA Button */}
        <div className="hidden md:block">
          <a href="#contact">
            <Button size="sm">Contact Me</Button>
          </a>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? (
            <X className="hover:text-primary" />
          ) : (
            <Menu size={24} className="hover:text-primary" />
          )}
        </button>
      </nav>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-stronger animate-fade-in animate-fade-out">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="text-lg text-muted-foreground hover:text-foreground py-2 "
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact">
              <Button onClick={() => setIsMobileMenuOpen(false)}>
                Contact Me
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
