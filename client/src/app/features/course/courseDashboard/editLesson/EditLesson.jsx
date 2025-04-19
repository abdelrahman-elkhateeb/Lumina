import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import { Link } from "react-router-dom";
import SelectCourse from "../../../ui/SelectCourse";
import { useInstructorCoursesQuery, useUpdateLessonMutation } from "../../../redux/courses/coursesApi";
import SelectSection from "../../../ui/SelectSection";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import { useState } from "react";
import SelectLesson from "./SelectLesson";
import UpdateTitle from "../../../ui/UpdateTitle";

function EditLesson() {

  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [updateLesson, { isLoading: loadingUpdateLesson, error: errorUpdateLesson }] = useUpdateLessonMutation();
  const [courseId, setCourseId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [lessonId, setLessonId] = useState(null);

  const [updatedData, setUpdatedData] = useState({});

  if (isLoading) return <LightBulbLoader />;

  const courses = data?.courses;
  const selectedCourse = courses?.find(c => c._id == courseId);
  const selectedSection = selectedCourse?.sections?.find(s => s._id == sectionId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLesson({ courseId, lessonId, data: updatedData }).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="container mx-auto px-4">
      <Heading title="edit your content here" img={spaceman} />
      <Link
        to="/section/manage/edit"
        className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
      >
        <span className="material-symbols-outlined">
          arrow_back
        </span>
        Update section
      </Link>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <SelectCourse courses={courses} setCourseId={setCourseId} />
        {selectedCourse && <SelectSection setSectionId={setSectionId} course={selectedCourse} />}
        {selectedSection && <SelectLesson section={selectedSection} setLessonId={setLessonId} />}
        {lessonId && <UpdateTitle setUpdatedData={setUpdatedData} />}

        <button className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto mb-10" type="submit">
          {loadingUpdateLesson ? "updating..." : "update lesson"}
        </button>
      </form>
    </section>
  )
}

export default EditLesson
