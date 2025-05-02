import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { useFetchUserDataQuery, useLogoutUserMutation } from "../../redux/auth/registrationApi";

function MobileMenu() {

  const menuButtonClassName = "hover:bg-secondary-700/70 p-3 transition";

  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useFetchUserDataQuery();
  const userType = data?.data.user.userType == "instructor";

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="relative md:hidden">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="text-accent-700 text-3xl"
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
        className={`fixed top-0 right-0 h-full w-64 bg-secondary-500 shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={closeMenu} className="text-2xl text-accent-700">
              <IoClose />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col px-6">
            <Link to="/" className={menuButtonClassName} onClick={closeMenu}>
              Home
            </Link>
            <Link to="/profile" className={menuButtonClassName} onClick={closeMenu}>
              profile
            </Link>
            {!userType ? <Link to="/courses/myCourses" className={menuButtonClassName} onClick={closeMenu}>
              my courses
            </Link> : null}
            {
              !userType ? <Link to="/courses/explore-courses" className={menuButtonClassName} onClick={closeMenu}>
                explore courses
              </Link> : null
            }
            {userType ? <Link to="/courses/create" onClick={closeMenu} className={menuButtonClassName}>
              create course
            </Link> : null}

            {userType ? <Link to="/courses/manage" onClick={closeMenu} className={menuButtonClassName}>
              manage course
            </Link> : null}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto p-6">
            <button className="w-full bg-red-500 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
