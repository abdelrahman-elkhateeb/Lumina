import { Link } from "react-router-dom"
import { useFetchUserDataQuery } from "../../redux/auth/registrationApi"

function DesktopNav() {
  const { data, isLoading, error } = useFetchUserDataQuery();
  const userType = data?.data.user.userType == "instructor";

  return (
    <ul className="hidden md:flex items-center justify-between gap-6">
      <li>
        <Link to="/courses/myCourses">
          my courses
        </Link>
      </li>
      <li>
        <Link to="/courses/explore-courses">
          explore our courses
        </Link>
      </li>
      {userType &&
        <li>
          <Link to="/courses/create">
            create course
          </Link>
        </li>
      }
    </ul>
  )
}

export default DesktopNav
