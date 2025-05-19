import { BookOpen, Eye, Trash2, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteCourseMutation } from "../redux/courses/coursesApi";

function AdminCourseCard({ courses }) {

  const [deleteCourse] = useDeleteCourseMutation();

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
      {courses.map((course) => (
        <div
          key={course._id}
          className="relative bg-background-700/50 shadow-xl rounded-xl transition-all duration-300 p-4 border border-background-500"
        >
          {/* Course Image */}
          <img
            src={course.courseImage}
            alt={`${course.title} Cover`}
            className="rounded-lg w-full object-cover mb-4"
          />

          {/* Course Details */}
          <h3 className="text-xl font-semibold text-text capitalize mb-1">
            {course.title}
          </h3>

          <h4 className="text-sm text-accent-500 capitalize mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent-500" />
            By {course.instructor?.name || "Unknown"}
          </h4>

          <div className="flex justify-between items-center mb-3">
            <span
              className={`font-semibold px-3 py-1 rounded-full
                ${course.price === 0
                  ? "bg-green-500/20 text-green-400"
                  : "bg-accent-500/20 text-accent-500"
                }`}
            >
              {course.price === 0 ? "Free" : `${course.price} $`}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-2">
            <Link
              to={`/courses/${course._id}`}
              className="flex items-center gap-1 text-sm bg-secondary-500 hover:bg-secondary-700 text-white px-3 py-1 rounded-full transition duration-200"
            >
              <Eye className="w-4 h-4" />
              View Course
            </Link>

            <Link
              to={`/courses/manage/edit/${course._id}`}
              className="flex items-center gap-1 text-sm bg-primary-500 hover:bg-primary-700 text-white px-3 py-1 rounded-full transition duration-200"
            >
              <Settings className="w-4 h-4" />
              Manage Course
            </Link>

            <button
              onClick={() => deleteCourse(course._id)}
              className="flex items-center gap-1 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full transition duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminCourseCard;
