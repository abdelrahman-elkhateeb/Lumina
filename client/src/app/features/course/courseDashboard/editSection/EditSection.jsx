import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import { useState } from "react";
import UpdateSectionTitle from "./UpdateSectionTitle";
import { useDeleteSectionMutation, useInstructorCoursesQuery, useUpdateSectionMutation } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import SelectCourse from "../../../ui/SelectCourse";
import SelectSection from "../../../ui/SelectSection";
import ErrorPage from "../../../ui/ErrorPage";
import { Link } from "react-router-dom";

function EditSection() {
  const [updateData, setUpdatedData] = useState("");
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [updateSection, { isLoading: isUpdateLoading, error: updateError }] = useUpdateSectionMutation();
    const [deleteSection, { isLoading: loadingDelete }] = useDeleteSectionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSection({ courseId, sectionId, data: updateData }).unwrap();
    } catch (err) {
      console.log(err);
    }
  }
  if (isLoading) return <LightBulbLoader />;
  if (error) return <ErrorPage />;

  const courses = data?.courses;
  const selectedCourse = courses.find(c => c._id === courseId)

  return (
    <section className="container mx-auto px-4">
      <Heading title="edit your content here" img={spaceman} />
      <div className="flex justify-between items-center">
        <Link
          to="/courses/manage/edit"
          className="w-fit mb-4  rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          <span className="material-symbols-outlined">
            arrow_back
          </span>
          Update course
        </Link>
        <Link
          to="/lesson/manage/edit"
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          Update lesson
          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <SelectCourse setCourseId={setCourseId} courses={courses} />
        {selectedCourse && <SelectSection setSectionId={setSectionId} course={selectedCourse} />}
        {sectionId && <UpdateSectionTitle setUpdatedData={setUpdatedData} />}
        <button className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto" type="submit">
          {isUpdateLoading ? "Creating..." : "update section "}
        </button>
      </form>
    </section>
  )
}

export default EditSection;
