import { Link, useNavigate } from "react-router-dom";
import maleSvg from "/public/assets/male.svg";
import femaleSvg from "/public/assets/female.svg";
import { useLogoutUserMutation } from "../../redux/auth/registrationApi";

function Profile({ user }) {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { photoURL } = storedUser || {};

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="relative hidden md:block group">
      <div className="cursor-pointer w-10 h-10 border-2 border-accent-700 rounded-full overflow-hidden">
        {photoURL ? <img src={photoURL} alt="" /> :
          <img
            src={user.gender === "male" ? maleSvg : femaleSvg}
            alt="profile"
            className="w-full h-full object-cover"
          />}
      </div>

      <div className="absolute bg-secondary-500/60 top-3.5 shadow-lg mt-2 right-0 w-32 rounded-lg overflow-hidden z-50 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200">
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
    </div>
  );
}

export default Profile;
