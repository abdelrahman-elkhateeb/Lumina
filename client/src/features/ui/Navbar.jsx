import { useState } from "react";
import { Link } from "react-router-dom";
import maleSvg from "../../../public/assets/male.svg"
import femaleSvg from "../../../public/assets/female.svg"

function navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="bg-white shadow-md w-full">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-poppins text-2xl font-bold uppercase text-indigo-600">
            Lumina
          </h1>
        </Link>

        {/* Search Bar (Hidden on Mobile) */}
        <div className="hidden md:flex flex-grow mx-8 max-w-xl">
          <input
            type="search"
            placeholder="Search courses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Desktop Buttons (Hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-6">

          {/* Your Learning Button */}
          <Link to="/courses" className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200">
            Your Learning
          </Link>

          {/* Cart Button */}
          <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>

          {/* Profile Button */}
          <button className="text-gray-700 hover:text-indigo-600 transition-all duration-200">
            <img src={maleSvg} alt="Profile" className="h-8 w-8 rounded-full" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-indigo-600 transition-all duration-200"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </section>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-2 space-y-4">
            {/* Search Bar (Visible on Mobile) */}
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />

            {/* Your Learning Link */}
            <Link
              to="/courses"
              className="block text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200"
            >
              Your Learning
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="block text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cart
            </Link>

            {/* Profile Button */}
            <button className="block text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200">
              <img src={maleSvg} alt="Profile" className="h-8 w-8 rounded-full inline-block mr-2" />
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default navbar
