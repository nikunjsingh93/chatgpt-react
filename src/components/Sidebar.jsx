import { useState } from "react";
import { Menu, X, Home, User, Settings } from "lucide-react";
import MainContent from "./MainContent"; // Importing MainContent Component

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-900 text-white p-4 flex flex-col items-start transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white mb-4 p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Links */}
        <nav className="flex flex-col gap-4">
          <NavItem icon={<Home size={24} />} text="Home" isOpen={isOpen} />
          <NavItem icon={<User size={24} />} text="Profile" isOpen={isOpen} />
          <NavItem icon={<Settings size={24} />} text="Settings" isOpen={isOpen} />
        </nav>
      </div>

      {/* Main Content Component */}
      <MainContent isOpen={isOpen} />
    </div>
  );
};

// Sidebar Item Component
const NavItem = ({ icon, text, isOpen }) => {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-all ${
        isOpen ? "w-auto" : "w-16"
      }`}
    >
      {icon}
      {isOpen && <span className="text-white">{text}</span>}
    </div>
  );
};

export default Sidebar;