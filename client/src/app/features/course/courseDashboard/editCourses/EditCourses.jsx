import { useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import CourseCard from "./CourseCard";
import LightBulbLoader from "../../../ui/LightBulbLoader";

function EditCourses() {
  const { data, isLoading, error, refetch } = useInstructorCoursesQuery();

  if (isLoading) {
    return <LightBulbLoader />;
  }

  return (
    <section className="container mx-auto px-4">
      <CourseCard courses={data?.courses} refetch={refetch} />
    </section>
  )
}

export default EditCourses;
