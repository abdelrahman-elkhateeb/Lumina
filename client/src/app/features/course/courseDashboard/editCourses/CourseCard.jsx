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
        <div key={course._id} className="bg-background-700/20 shadow-xl rounded-xl transition-all duration-300 p-3 flex justify-between">
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

          <Link to={`/courses/manage/edit/${course._id}`} className="text-accent-500 hover:underline">
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CourseCard;
