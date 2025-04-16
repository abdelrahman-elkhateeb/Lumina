import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import SelectCourse from "./SelectCourse";
import { useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import SelectSection from "./SelectSection";
import { useState } from "react";
import ErrorPage from "../../../ui/ErrorPage";
import SetTitle from "./SetTitle";
import SetDescription from "./SetDescription";
import SetLessonVideo from "./SetLessonVideo";

function CreateLesson() {
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [selectCourseId, setSelectedCourseId] = useState("");

  if (isLoading) return <LightBulbLoader />;
  if (error) return <ErrorPage />;

  const courses = data.courses;
  const selectedCourse = courses.find(c => c._id === selectCourseId)

  return (
    <section className="container mx-auto px-4">
      <Heading title="create lesson" img={spaceman} />

      <form action="" className="grid gap-5">
        <div className="grid gap-5">
          <SetTitle />
          <SelectCourse courses={courses} setSelectedCourseId={setSelectedCourseId} />
          {selectedCourse && <SelectSection course={selectedCourse} />}
          <SetDescription />
          <SetLessonVideo />
        </div>
        <button className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto" type="submit">
          Create Lesson
        </button>
      </form>
    </section>
  )
}

export default CreateLesson;
