import { useGetMyCoursesQuery } from "../../redux/courses/coursesApi";
import LightBulbLoader from "../../ui/LightBulbLoader";
import spaceMan from "../../../../../public/assets/spaceMan(3).svg";
import Heading from "../../ui/Heading";
import { Link } from "react-router-dom";

function MyCourses() {
  const { data, isLoading, error } = useGetMyCoursesQuery();
  const courses = data?.courses || [];

  if (isLoading) return <LightBulbLoader />;
  if (error) return <p>Error loading courses.</p>;

  return (
    <section className="min-h-dvh container mx-auto px-4">
      <Heading img={spaceMan} title="your learnings" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link to={`/courses/${course._id}`} key={course._id}>
            <div>
              <img src={course.courseImage} alt="course image" />
              <h2 className="text-lg font-bold">{course.title}</h2>
              <p>{course.instructor.name}</p>
              <p>{course.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MyCourses;
