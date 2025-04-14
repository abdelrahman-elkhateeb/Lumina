import { Link } from "react-router-dom"
import { useFetchUserDataQuery } from "../../redux/auth/registrationApi"

function DesktopNav() {
  const { data, isLoading, error } = useFetchUserDataQuery();
  const userType = data?.data.user.userType == "instructor";

  return (
    <ul className="hidden md:flex items-center justify-between gap-6">
      <li>
        {!userType && <Link to="/courses/myCourses">
          my courses
        </Link>}
      </li>
      <li>
        <Link to="/courses/explore-courses">
          explore our courses
        </Link>
      </li>
      {userType &&
        <li>
          <Link to="/courses/manage">
            manage course
          </Link>
        </li>
      }
      {userType &&
        <li>
          <Link to="/courses/create">
            create course
          </Link>
        </li>
      }
      {userType &&
        <li>
          <Link to="/courses/section/create">
            create section
          </Link>
        </li>
      }
      {userType &&
        <li>
          <Link to="/courses/lesson/create">
            create lesson
          </Link>
        </li>
      }
    </ul>
  )
}

export default DesktopNav
