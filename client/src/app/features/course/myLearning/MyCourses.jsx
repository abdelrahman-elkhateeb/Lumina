import { useGetMyCoursesQuery } from "../../redux/courses/coursesApi";
import LightBulbLoader from "../../ui/LightBulbLoader";

function MyCourses() {
  const { data, isLoading, error } = useGetMyCoursesQuery();

  if (isLoading) return <LightBulbLoader />;
  if (error) return <p>Error loading courses.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data?.courses?.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <img
            src={course.courseImage}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-1">
              <strong>Category:</strong> {course.category}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Instructor:</strong> {course.instructor?.name}
            </p>
            <p className="text-gray-600">
              <strong>Type:</strong> {course.enrollmentType}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCourses;
