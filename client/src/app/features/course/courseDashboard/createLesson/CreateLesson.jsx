import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import SelectCourse from "./SelectCourse";
import { useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import SelectSection from "./SelectSection";

function CreateLesson() {
  const { data, isLoading, error } = useInstructorCoursesQuery();

  if (isLoading) return <LightBulbLoader />
  const courses = data.courses;

  return (
    <section className="container mx-auto px-4">
      <Heading title="create lesson" img={spaceman} />

      <form action="" className="grid gap-5">
        <SelectCourse courses={courses} />
        <SelectSection courses={courses} />
      </form>
    </section>
  )
}

export default CreateLesson;
