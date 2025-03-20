import { Link } from "react-router-dom"

function DesktopNav() {
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
    </ul>
  )
}

export default DesktopNav
