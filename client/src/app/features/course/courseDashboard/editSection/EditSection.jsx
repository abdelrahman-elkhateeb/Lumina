import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import { useState } from "react";
import UpdateSectionTitle from "./UpdateSectionTitle";
import { useInstructorCoursesQuery, useUpdateSectionMutation } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import SelectCourse from "../editSection/SelectCourse";

function EditSection() {
  const [updateData, setUpdatedData] = useState("");
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [updateSection, { isLoading: isUpdateLoading, error: updateError }] = useUpdateSectionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSection({ sectionId, data: updateData }).unwrap();
    } catch (err) {
      console.log(err);
    }
  }
  if (isLoading) return <LightBulbLoader />
  return (
    <section className="container mx-auto px-4">
      <Heading title="edit your content here" img={spaceman} />
      <form onSubmit={handleSubmit}>
        <SelectCourse setCourseId={setCourseId} />
        <UpdateSectionTitle setUpdatedData={setUpdatedData} />

      </form>
    </section>
  )
}

export default EditSection;
