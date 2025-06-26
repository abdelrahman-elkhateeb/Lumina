import { useGetMyCoursesQuery } from "../../redux/courses/coursesApi";
import LightBulbLoader from "../../ui/LightBulbLoader";
import Heading from "../../ui/Heading";
import { Link } from "react-router-dom";

function MyCourses() {
  const { data, isLoading, error } = useGetMyCoursesQuery();
  const courses = data?.courses || [];

  if (isLoading) return <LightBulbLoader />;
  if (error) return <p>Error loading courses.</p>;

  return (
    <section className="container mx-auto px-4 py-8">
      <Heading img="/public/assets/spaceMan(3).svg" title="your learnings" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {courses.map((course) => (
          <Link to={`/courses/${course._id}`} key={course._id}>
            <div className="rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden hover:scale-105 transform relative">
              <img
                src={course.courseImage}
                alt={`${course.title} image`}
                className="w-full"
              />
              <div className="p-4 space-y-2 absolute z-10 left-0 bottom-0 bg-primary-500/90">
                <h2 className="text-xl font-bold text-primary capitalize">
                  {course.title}
                </h2>
                <p className="text-sm text-site-text capitalize">
                  Instructor:{" "}
                  <span className="font-medium ">
                    {course.instructor.name}
                  </span>
                </p>
                <span className="inline-block bg-secondary-700 text-xs px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

  );
}

export default MyCourses;
