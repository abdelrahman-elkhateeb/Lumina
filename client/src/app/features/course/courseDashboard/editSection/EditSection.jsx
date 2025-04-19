import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import { useState } from "react";
import UpdateSectionTitle from "./UpdateSectionTitle";
import { useInstructorCoursesQuery, useUpdateSectionMutation } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import SelectCourse from "../../../ui/SelectCourse";
import SelectSection from "../../../ui/SelectSection";
import ErrorPage from "../../../ui/ErrorPage";

function EditSection() {
  const [updateData, setUpdatedData] = useState("");
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [updateSection, { isLoading: isUpdateLoading, error: updateError }] = useUpdateSectionMutation()

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
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <SelectCourse setCourseId={setCourseId} courses={courses} />
        {selectedCourse && <SelectSection setSectionId={setSectionId} course={selectedCourse} />}
        <UpdateSectionTitle setUpdatedData={setUpdatedData} />
        <button className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto" type="submit">
          {isUpdateLoading ? "Creating..." : "Create Lesson"}
        </button>
      </form>
    </section>
  )
}

export default EditSection;
