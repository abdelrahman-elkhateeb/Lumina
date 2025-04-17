import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(1).svg";
import { useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import UpdateTitle from "./UpdateTitle";
import UpdateDescription from "./UpdateDescription";
import { useState } from "react";

function EditCoursePage() {
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [courseId, setCourseId] = useState(null);


  if (isLoading) return <LightBulbLoader />
  const courses = data?.courses;

  return (
    <section className="container mx-auto px-4">
      <Heading title="edit your content here" img={spaceman} />
      <select
        id="course"
        name="section"
        defaultValue=""
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-accent-500 hover:shadow-lg hover:border-blue-300 bg-gray-100 text-black"
        onChange={e => setCourseId(e.target.value)}
      >
        <option value="" disabled>
          -- Select a course --
        </option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-5">
        <UpdateTitle />
        <UpdateDescription />

      </div>
    </section>
  )
}

export default EditCoursePage;
