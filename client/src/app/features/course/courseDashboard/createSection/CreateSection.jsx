import Heading from "../../../ui/Heading";
import spaceMan from "../../../../../../public/assets/spaceMan(7).svg";
import { useCreateSectionMutation, useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import { useState } from "react";
import ChooseCourse from "./ChooseCourse";
import CreateSectionTitle from "./CreateSectionTitle";

function CreateSection() {
  const initialValues = { title: "", courseId: "" };
  const { data, isLoading } = useInstructorCoursesQuery();
  const [formValues, setFormValues] = useState(initialValues);
  const [createSection] = useCreateSectionMutation();

  const handleSubmit = () => {
    createSection(formValues);
  }

  if (isLoading) return <LightBulbLoader />;

  const courses = data.courses;
  return (
    <section className="container mx-auto px-4">
      <Heading title="create new section" img={spaceMan} />
      <form action="" className="grid gap-5" onSubmit={handleSubmit}>
        {/* choose course */}
        <ChooseCourse courses={courses} setFormValues={setFormValues} formValues={formValues} />
        {/* type title for the section */}
        <CreateSectionTitle formValues={formValues} setFormValues={setFormValues} />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-primary-700 transition-all duration-300 w-fit ml-auto"
        >
          {isLoading ? "Submitting..." : "create section"}
        </button>
      </form>
    </section>
  )
}

export default CreateSection;
