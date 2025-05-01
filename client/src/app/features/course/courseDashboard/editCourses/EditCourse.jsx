import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import { useInstructorCoursesQuery, useUpdateCourseMutation } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import UpdateTitle from "../../../ui/UpdateTitle";
import UpdateDescription from "../../../ui/UpdateDescription";
import { useState } from "react";
import SelectCourse from "../../../ui/SelectCourse";
import UpdateVideo from "../../../ui/UpdateVideo";
import UpdateImage from "./UpdateImage";
import UpdatePrice from "./UpdatePrice";
import { Link } from "react-router-dom";

function EditCourse() {
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [updateCourse, { isLoading: isUpdateLoading }] = useUpdateCourseMutation();

  const [courseId, setCourseId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedVideo, setSelectedVideo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) {
      return alert("Please select a course.");
    }

    const hasFile = selectedImage || selectedVideo;
    const hasUpdates = Object.keys(updatedData).length > 0;

    if (!hasFile && !hasUpdates) {
      return alert("Please update at least one field.");
    }

    try {
      let payload;

      if (hasFile) {
        // Create FormData if file(s) are involved
        const formData = new FormData();
        if (selectedImage) formData.append("courseImage", selectedImage);
        if (selectedVideo) formData.append("previewVideo", selectedVideo);

        Object.entries(updatedData).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value);
          }
        });


        payload = formData;
      } else {
        // If no files, send JSON
        payload = updatedData;
      }

      await updateCourse({ courseId, data: payload }).unwrap();
      alert("Course updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Something went wrong.");
    }
  };


  if (isLoading) return <LightBulbLoader />
  const courses = data?.courses;

  return (
    <section className="container mx-auto px-4">
      <Heading title="edit your content here" img={spaceman} />
      <div className="flex items-center justify-between">
        <Link
          to="/create/placement-test"
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          create placement test
        </Link>
        <Link
          to="/section/manage/edit"
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          Update Section
          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </Link>
      </div>

      <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <SelectCourse setCourseId={setCourseId} courses={courses} />
        {courseId &&
          <>
            <UpdateTitle setUpdatedData={setUpdatedData} />
            <UpdateDescription setUpdatedData={setUpdatedData} />
            <UpdatePrice setUpdatedData={setUpdatedData} />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <UpdateVideo setSelectedVideo={setSelectedVideo} />
              <UpdateImage setSelectedImage={setSelectedImage} />
            </div>
          </>}
        <button className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto mb-10" type="submit">
          {isUpdateLoading ? "Creating..." : "update course"}
        </button>
      </form>
    </section>
  )
}

export default EditCourse;
