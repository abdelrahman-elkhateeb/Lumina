import { Link, useNavigate } from "react-router-dom";
import maleSvg from "../../../../../public/assets/male.svg";
import femaleSvg from "../../../../../public/assets/female.svg";
import { useLogoutUserMutation } from "../../redux/auth/registrationApi";
import Button from "../../ui/Button";
import { useState } from "react";

function Profile({ user }) {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="relative hidden md:block">
      <div
        className="cursor-pointer w-10 h-10 border-2 border-accent-700 rounded-full overflow-hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          src={user.gender === "male" ? maleSvg : femaleSvg}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {isMenuOpen && (
        <div className="absolute bg-secondary-500/60 shadow-lg mt-2 right-0 w-32 rounded-lg overflow-hidden z-50">
          <ul className="flex flex-col py-2">
            <li>
              <Link
                to="/profile"
                className="block hover:bg-secondary-500/20 px-4 py-2 transition"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
