import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

function CourseCard({ courses = [] }) {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      {courses.map((course) => (
        <Link key={course._id} to={`/courses/preview/${course._id}`}>
          <div

            className="relative bg-background-700/20 shadow-xl rounded-xl transition-all duration-300"
          >
            {/* Course Image */}
            <div className="w-full">
              <img
                src={course.courseImage}
                alt={`${course.title} Cover`}
                className="rounded-lg"
              />
            </div>

            {/* Course Details */}
            <div className="p-3">
              <h3 className="text-xl font-semibold text-white capitalize mb-1">
                {course.title}
              </h3>

              <h4 className="text-sm text-gray-400 capitalize mb-2 flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-gray-500" />
                By {course.instructor?.name || "Unknown"}
              </h4>

              {/* Price & Enrollment Type */}
              <div className="flex justify-end items-center text-sm">
                <span
                  className={`font-semibold px-3 py-1 rounded-full 
                  ${course.price === 0
                      ? "bg-green-500/20 text-green-400"
                      : "bg-primary-500/20 text-primary-500"
                    }`}
                >
                  {course.price === 0 ? "Free" : `${course.price} $`}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CourseCard;
