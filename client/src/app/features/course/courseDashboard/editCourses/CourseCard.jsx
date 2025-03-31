import { Link } from "react-router-dom";
import { useDeleteCourseMutation } from "../../../redux/courses/coursesApi";

function CourseCard({ courses, refetch }) {
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course permanently?")) {
      try {
        await deleteCourse(courseId).unwrap();
        console.log("Course deleted successfully");
        if (refetch) refetch();
      } catch (error) {
        console.error("Delete error:", error);
      }
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
            <Link to="/courses/manage/edit" className="text-accent-500 hover:underline">
              Edit
            </Link>

            {/* Delete Button (This won't trigger navigation) */}
            <button
              className="p-2 bg-red-500 text-white rounded-md"
              onClick={() => handleDeleteCourse(course._id)}
              disabled={isLoading}
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseCard;
