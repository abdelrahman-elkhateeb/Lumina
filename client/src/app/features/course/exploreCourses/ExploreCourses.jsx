import Heading from "../../ui/Heading";
import spaceMan from "../../../../../public/assets/spaceMan(5).svg";
import { useGetcoursesPreviewQuery } from "../../redux/courses/coursesApi";
import CourseCard from "../../ui/CourseCard";

function exploreCourses() {
  const { data } = useGetcoursesPreviewQuery();
  const courses = data?.courses;

  return (
    <section className="bg-background-500 container mx-auto px-4">
      <Heading img={spaceMan} title="explore the magic of our courses" />

      <CourseCard courses={courses} />
    </section>
  )
}

export default exploreCourses;
