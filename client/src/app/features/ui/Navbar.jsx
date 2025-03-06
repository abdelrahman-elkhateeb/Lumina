import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserDataQuery, useLogoutUserMutation } from "../auth/registrationApi";
import maleSvg from "../../../../public/assets/male.svg";
import femaleSvg from "../../../../public/assets/female.svg";
import ErrorPage from "./ErrorPage";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: userData, isLoading, error } = useFetchUserDataQuery();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const user = userData?.data?.user;

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  if (isLoading) return null;

  return (
    <header className="sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {error && <ErrorPage />}

        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Lumina
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden focus:outline-none">
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>

        {/* Center: Search Bar (Hidden on Mobile) */}
        <div className="hidden md:flex flex-grow justify-center">
          <input
            className="p-2 w-full max-w-md rounded-full border border-gray-300 focus:outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-accent transition"
            placeholder="Where should we start?"
            type="search"
          />
        </div>

        {/* Right: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 font-medium  ">
          {user ? (
            <>
              <Link to="#" className="hover:text-accent transition">My Learning</Link>
              <Link to="#" className="hover:text-accent transition">Instructor</Link>
              <Link to="#" className="hover:text-accent transition">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button onClick={toggleMenu} className="w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden">
                  <img src={user.gender === "male" ? maleSvg : femaleSvg} alt="Profile" className="w-full h-full object-cover" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-2 border">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
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
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition">Login</Link>
              <Link to="/signup" className="bg-accent text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4">
          <div className="container mx-auto flex flex-col items-center gap-4 font-medium">
            {user ? (
              <>
                <Link to="#" className="hover:text-accent transition">My Learning</Link>
                <Link to="#" className="hover:text-accent transition">Instructor</Link>
                <Link to="#" className="hover:text-accent transition">
                  <i className="fa-solid fa-cart-shopping text-lg"></i>
                </Link>

                {/* Profile and Logout */}
                <div className="flex flex-col items-center gap-2">
                  <button onClick={toggleMenu} className="w-12 h-12 rounded-full border-2 border-gray-300 overflow-hidden">
                    <img src={user.gender === "male" ? maleSvg : femaleSvg} alt="Profile" className="w-full h-full object-cover" />
                  </button>
                  {isMenuOpen && (
                    <div className="w-48 bg-white shadow-lg rounded-lg py-2 border">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
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
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-accent transition">Login</Link>
                <Link to="/signup" className="bg-accent text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
