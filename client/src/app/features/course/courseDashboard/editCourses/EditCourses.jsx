import { useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import CourseCard from "./CourseCard";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import Heading from "../../../ui/Heading";
import spaceMan from "../../../../../../public/assets/spaceMan(7).svg";

function EditCourses() {
  const { data, isLoading, error, refetch } = useInstructorCoursesQuery();

  if (isLoading) {
    return <LightBulbLoader />;
  }

  return (
    <section className="container mx-auto px-4">
      <Heading title="manage all your content" img={spaceMan} />
      <CourseCard courses={data?.courses} refetch={refetch} />
    </section>
  )
}

export default EditCourses;
