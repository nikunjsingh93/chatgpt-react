// Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        {/* Heading */}
        <h1 className="text-white text-2xl font-semibold">Nik GPT</h1>

        {/* Navigation Links */}
        <div className="space-x-6">
          <a href="#about" className="text-white hover:text-gray-300">
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
