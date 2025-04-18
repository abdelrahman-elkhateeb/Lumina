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
import { Link } from "react-router-dom";

function EditCoursePage() {
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [updateCourse, { isLoading: isUpdateLoading }] = useUpdateCourseMutation();

  const [courseId, setCourseId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedVideo, setSelectedVideo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId || Object.keys(updatedData).length === 0) {
      return alert("Please select a course and update at least one field.");
    }
    const formData = new FormData();

    if (selectedImage)
      formData.append("image", selectedImage);

    if (selectedVideo)
      formData.append("image", selectedVideo);

    try {
      await updateCourse({ courseId, data: updatedData }).unwrap();
    } catch (error) {
      console.error("Update failed", error);
    }
  }

  if (isLoading) return <LightBulbLoader />
  const courses = data?.courses;

  return (
    <section className="container mx-auto px-4">
      <Heading title="edit your content here" img={spaceman} />

      <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <SelectCourse setCourseId={setCourseId} courses={courses} />
        <UpdateTitle setUpdatedData={setUpdatedData} />
        <UpdateDescription setUpdatedData={setUpdatedData} />
        <UpdatePrice setUpdatedData={setUpdatedData} />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <UpdateVideo setSelectedVideo={setSelectedVideo} />
          <UpdateImage setSelectedImage={setSelectedImage} />
        </div>
        <button className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto" type="submit">
          {isUpdateLoading ? "Creating..." : "update course"}
        </button>
      </form>
      <Link></Link>
    </section>
  )
}

export default EditCoursePage;
