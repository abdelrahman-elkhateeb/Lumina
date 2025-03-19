import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="text-gray-800 text-3xl focus:outline-none"
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={closeMenu} className="text-2xl text-gray-600">
              <IoClose />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col gap-4 px-6">
            <Link to="/" className="text-gray-800 text-lg hover:text-blue-500" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/about" className="text-gray-800 text-lg hover:text-blue-500" onClick={closeMenu}>
              About
            </Link>
            <Link to="/services" className="text-gray-800 text-lg hover:text-blue-500" onClick={closeMenu}>
              Services
            </Link>
            <Link to="/contact" className="text-gray-800 text-lg hover:text-blue-500" onClick={closeMenu}>
              Contact
            </Link>
          </nav>

          {/* Logout Button (Optional) */}
          <div className="mt-auto p-6">
            <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
