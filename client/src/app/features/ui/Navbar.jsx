import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserDataQuery, useLogoutUserMutation } from "../redux/auth/registrationApi";
import maleSvg from "../../../../public/assets/male.svg";
import femaleSvg from "../../../../public/assets/female.svg";
import ErrorPage from "./ErrorPage";

function Navbar() {

  const { data: userData, isLoading, error } = useFetchUserDataQuery();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const user = userData?.data?.user;

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  if (isLoading) return null;

  if (error) return <ErrorPage />;

  return (
    <header className="sticky top-0 z-[1000] p-2 md:p-4 font-heading">
      <nav className="flex items-center justify-between px-6 py-4 bg-secondary-500/60 rounded-lg">

        {/* Left: Logo */}
        <Link to="/" className="text-2xl tracking-wide">
          Lumina
        </Link>

        <ul className="flex items-center justify-between gap-2">
          <li>
            <Link to="/courses/myCourses">
              my courses
            </Link>
          </li>
          <li>
            <Link to="">
              explore our courses
            </Link>
          </li>
        </ul>

        <div>
          <Link to="/profile">
            <img src={`${user.gender == "male" ? maleSvg : femaleSvg}`} alt="profile" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
