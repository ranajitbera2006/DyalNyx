import React, { useState } from "react";

export const Navbar = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "projects", label: "Project List" },
    { id: "addProject", label: "Add Project" },
    { id: "skills", label: "Skills" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#0b0e14] border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 max-w-7xl mx-auto">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 cursor-pointer font-bold text-xl tracking-wide">
          <img
            src="/dualnyx1.png"
            alt="User"
            className="w-16 h-11 sm:w-20 sm:h-14 object-contain"
          />
        </div>

        {/* Desktop Nav Pills */}
        <nav className="hidden md:flex items-center bg-[#161d26] p-1.5 rounded-full border border-gray-700/60 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`px-5 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-[#25303f] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Controls (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 lg:px-5 py-2 text-xs lg:text-sm rounded-full bg-[#161d26] border border-gray-700 text-gray-300 hover:bg-[#202936] transition">
            Settings
          </button>
          <button className="flex items-center gap-1.5 px-4 lg:px-5 py-2 text-xs lg:text-sm rounded-full bg-blue-600 hover:bg-blue-500 font-semibold text-white shadow-md transition">
            Exit <span>➔</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#161d26] border border-gray-800 text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <span className="text-xl leading-none">✕</span>
          ) : (
            <span className="text-xl leading-none">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute right-0 left-0 px-4 pt-2 pb-6 border-t border-gray-800/80 bg-[#0f131a] flex flex-col gap-3 transition-all">
          <div className="flex flex-col gap-1.5 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === item.id
                    ? "bg-[#25303f] text-white"
                    : "text-gray-400 hover:bg-[#161d26] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-800">
            <button className="w-full py-2.5 text-xs text-center rounded-xl bg-[#161d26] border border-gray-700 text-gray-300">
              Settings
            </button>
            <button className="w-full py-2.5 text-xs text-center rounded-xl bg-blue-600 font-semibold text-white">
              Exit ➔
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
