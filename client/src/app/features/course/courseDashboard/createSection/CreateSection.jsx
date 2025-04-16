import Heading from "../../../ui/Heading";
import spaceMan from "../../../../../../public/assets/spaceMan(7).svg";
import { useCreateSectionMutation, useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import { useState } from "react";
import ChooseCourse from "./ChooseCourse";
import CreateSectionTitle from "./CreateSectionTitle";

function CreateSection() {
  const initialValues = { title: "", courseId: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const { data, isLoading } = useInstructorCoursesQuery();
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

        <button className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto" type="submit">
          {isLoading ? "Creating..." : "Create section"}
        </button>
      </form>
    </section>
  )
}

export default CreateSection;
