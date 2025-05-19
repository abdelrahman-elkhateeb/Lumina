import { Link } from "react-router-dom";
import { useFetchUserDataQuery } from "../../redux/auth/registrationApi";

function DesktopNav() {
  const { data, isLoading, error } = useFetchUserDataQuery();

  const userType = data?.data?.user?.userType;

  // Show nothing until we know the user
  if (isLoading || error) return null;

  return (
    <ul className="hidden md:flex items-center justify-between gap-6">
      {userType === "admin" && (
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
      )}

      {userType === "instructor" && (
        <>
          <li>
            <Link to="/courses/manage">Manage Course</Link>
          </li>
          <li>
            <Link to="/courses/create">Create Course</Link>
          </li>
        </>
      )}

      {(!userType || userType === "student") && (
        <>
          <li>
            <Link to="/courses/myCourses">My Courses</Link>
          </li>
          <li>
            <Link to="/courses/explore-courses">Explore Our Courses</Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default DesktopNav;
