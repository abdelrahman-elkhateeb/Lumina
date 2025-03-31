import { useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import CourseCard from "./CourseCard";
import LightBulbLoader from "../../../ui/LightBulbLoader";

function EditCourses() {
  const { data, isLoading, error } = useInstructorCoursesQuery();

  if (isLoading) {
    return <LightBulbLoader />;
  }

  return (
    <section className="container mx-auto px-4">
      <CourseCard courses={data?.courses} />
    </section>
  )
}

export default EditCourses;
