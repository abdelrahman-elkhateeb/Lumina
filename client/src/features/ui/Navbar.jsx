import { useState } from "react";
import { Link} from "react-router-dom";
function navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Lumina
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/courses"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Courses
            </Link>
            <Link
              to="/ide"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Live IDE
            </Link>
            <Link
              to="/chatbot"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Chatbot
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/courses"
              className="block text-gray-700 hover:text-indigo-600 font-medium"
            >
              Courses
            </Link>
            <Link
              to="/ide"
              className="block text-gray-700 hover:text-indigo-600 font-medium"
            >
              Live IDE
            </Link>
            <Link
              to="/chatbot"
              className="block text-gray-700 hover:text-indigo-600 font-medium"
            >
              Chatbot
            </Link>
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-indigo-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="block text-gray-700 hover:text-indigo-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default navbar
