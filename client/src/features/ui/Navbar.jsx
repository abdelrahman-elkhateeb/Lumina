import { useState } from "react";
import maleSvg from "../../../public/assets/male.svg";
import femaleSvg from "../../../public/assets/female.svg";
import { useFetchUserDataQuery } from "../../app/features/auth/registrationApi";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use the query hook to fetch user data
  const { data: userData, isLoading, error } = useFetchUserDataQuery();
  console.log(userData);
  
  // Safely access user data
  const user = userData;
  
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="sticky top-0 z-50 py-2">
      <nav>
        {isLoading && <p>Loading user data...</p>}
        {error && <p>Error loading user data: {error.message}</p>}
        {user && (
          <>
            <section className="container mx-auto flex justify-between items-center gap-8 p-4">
              {/* Left Section: Logo and Search Bar */}
              <div className="flex items-center gap-8 flex-grow">
                {/* Logo */}
                <Link to="/">
                  <h1 className="font-poppins uppercase text-xl font-bold">lumina</h1>
                </Link>

                {/* Search Bar */}
                <input
                  className="p-3 shadow-md rounded-full outline-none flex-grow max-w-md"
                  placeholder="Where should we start??"
                  type="search"
                />
              </div>

              {/* Right Section: Links and Profile Icon */}
              <div className="capitalize flex items-center gap-6">
                <Link to="" className="hover:text-accent-600 transition-colors">
                  My Learning
                </Link>
                <Link to="" className="hover:text-accent-600 transition-colors">
                  Instructor
                </Link>
                <Link to="" className="hover:text-accent-600 transition-colors">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                {/* Profile Icon */}
                <div className="w-9 h-9 border-2 rounded-full cursor-pointer border-accent-600 overflow-hidden">
                  {user.gender === "male" ? (
                    <img src={maleSvg} alt="Male Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <img src={femaleSvg} alt="Female Avatar" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
