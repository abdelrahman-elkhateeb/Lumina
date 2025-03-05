import { useState } from "react";
import maleSvg from "../../../../public/assets/male.svg";
import femaleSvg from "../../../../public/assets/female.svg";
import { useFetchUserDataQuery, useLogoutUserMutation } from "../auth/registrationApi";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Use the query hook to fetch user data
  const { data: userData, isLoading, error } = useFetchUserDataQuery();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  // Safely access user data
  const user = userData?.data?.user;

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap(); // Call the logout mutation
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  if (isLoading) return null;
  return (
    <header className="sticky top-0 z-50 py-2">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {error && <ErrorPage />}

        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-heading tracking-wide">
          Lumina
        </Link>

        {/* Center: Search Bar (hidden on mobile) */}
        <div className="hidden md:flex flex-grow justify-center">
          <input
            className="p-3 w-full max-w-md rounded-full border border-gray-300 focus:outline-none focus:ring-2 placeholder:text-black text-black focus:ring-accent transition"
            placeholder="Where should we start?"
            type="search"
          />
        </div>

        {/* Right: Links & Profile */}
        {user && (
          <div className="flex items-center gap-6 font-heading tracking-wider">
            <Link to="" className="hover:text-accent transition">
              My Learning
            </Link>
            <Link to="" className="hover:text-accent transition">
              Instructor
            </Link>
            <Link to="" className="hover:text-accent transition">
              <i className="fa-solid fa-cart-shopping text-lg"></i>
            </Link>

            {/* Profile Icon */}
            <div className="relative">
              <button onClick={toggleMenu} className="w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src={user.gender === "male" ? maleSvg : femaleSvg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-2 border">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
