import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(1).svg";
import { useInstructorCoursesQuery, useUpdateCourseMutation } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import UpdateTitle from "./UpdateTitle";
import UpdateDescription from "./UpdateDescription";
import { useState } from "react";
import SelectCourse from "./SelectCourse";
import UpdateVideo from "./UpdateVideo";
import UpdateImage from "./UpdateImage";
import UpdatePrice from "./UpdatePrice";

function EditCoursePage() {
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [updateCourse, { isUpdateLoading, err }] = useUpdateCourseMutation();
  
  const [courseId, setCourseId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  if (isLoading) return <LightBulbLoader />
  const courses = data?.courses;

  return (
    <section className="container mx-auto px-4">
      <Heading title="edit your content here" img={spaceman} />

      <form action="" className="flex flex-col gap-5">
        <SelectCourse setCourseId={setCourseId} courses={courses} />
        <UpdateTitle />
        <UpdateDescription />
        <UpdatePrice />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <UpdateVideo />
          <UpdateImage />
        </div>
      </form>
    </section>
  )
}

export default EditCoursePage;
