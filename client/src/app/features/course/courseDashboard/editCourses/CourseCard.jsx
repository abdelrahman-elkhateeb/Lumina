import { Link } from "react-router-dom";
import { useDeleteCourseMutation } from "../../../redux/courses/coursesApi";

function CourseCard({ courses }) {
  const [deleteCourse] = useDeleteCourseMutation();

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId).unwrap();
      console.log(`Course ${courseId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      {courses.map((course) => (
        <div key={course._id} className="bg-background-700/20 shadow-xl rounded-xl transition-all duration-300 p-3">
          {/* Course Image */}
          <div className="w-full">
            <img src={course.courseImage} alt={`${course.title} Cover`} className="rounded-lg" />
          </div>

          {/* Course Details */}
          <div className="p-3">
            <h3 className="text-xl font-semibold text-white capitalize mb-1">
              {course.title}
            </h3>
          </div>

          {/* Actions (Edit & Delete) */}
          <div className="flex justify-between items-center mt-2">
            {/* Edit Link (Only this navigates) */}
            <Link to="/editCourse" className="text-accent-500 hover:underline">
              Edit
            </Link>

            {/* Delete Button (This won't trigger navigation) */}
            <button
              className="p-2 bg-red-500 text-white rounded-md"
              onClick={() => handleDeleteCourse(course._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseCard;
