import { useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import CourseCard from "./CourseCard";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import Heading from "../../../ui/Heading";

function EditCourses() {
  const { data, isLoading, error, refetch } = useInstructorCoursesQuery();

  if (isLoading) {
    return <LightBulbLoader />;
  }

  return (
    <section className="container mx-auto px-4">
      <Heading title="manage all your content" img="/public/assets/spaceMan(7).svg" />
      <CourseCard courses={data?.courses} refetch={refetch} />
    </section>
  )
}

export default EditCourses;
