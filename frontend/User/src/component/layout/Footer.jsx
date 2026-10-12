import React from 'react'
import {
  FaGithub,
  FaLinkedin
} from "react-icons/fa";
const Footer = () => {
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
  return (
    <footer className="w-full border-t border-neutral-800/80 bg-transparent py-6 text-sm text-neutral-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Ranajit Bera. All rights reserved.</p>
        <div className="flex gap-6">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className=" p-2 text-muted-foreground hover:text-primary border rounded-full "
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer
