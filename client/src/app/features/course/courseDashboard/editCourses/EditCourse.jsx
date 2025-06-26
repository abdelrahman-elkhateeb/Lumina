import Heading from "../../../ui/Heading";
import spaceman from "/public/assets/spaceMan(7).svg";
import { useInstructorCoursesQuery, useUpdateCourseMutation } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import UpdateTitle from "../../../ui/UpdateTitle";
import UpdateDescription from "../../../ui/UpdateDescription";
import { useState } from "react";
import UpdateVideo from "../../../ui/UpdateVideo";
import UpdateImage from "./UpdateImage";
import UpdatePrice from "./UpdatePrice";
import { Link, useParams } from "react-router-dom";

function EditCourse() {
  const { courseId } = useParams();

  const { isLoading } = useInstructorCoursesQuery();
  const [updateCourse, { isLoading: isUpdateLoading }] = useUpdateCourseMutation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [updatedData, setUpdatedData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId) {
      return alert("Course ID not found in URL.");
    }

    const hasFile = selectedImage || selectedVideo;
    const hasUpdates = Object.keys(updatedData).length > 0;

    if (!hasFile && !hasUpdates) {
      return alert("Please update at least one field.");
    }

    try {
      let payload;

      if (hasFile) {
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
        payload = updatedData;
      }

      await updateCourse({ courseId, data: payload }).unwrap();
      alert("Course updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Something went wrong.");
    }
  };

  if (isLoading) return <LightBulbLoader />;

  return (
    <section className="container mx-auto px-4">
      <Heading title="Edit your content here" img={spaceman} />
      <div className="flex items-center justify-between">
        <Link
          to={`/create/placement-test/${courseId}`}
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          Create Placement Test
        </Link>
        <Link
          to={`/section/manage/edit/${courseId}`}
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          Update Section
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <UpdateTitle setUpdatedData={setUpdatedData} />
        <UpdateDescription setUpdatedData={setUpdatedData} />
        <UpdatePrice setUpdatedData={setUpdatedData} />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <UpdateVideo setSelectedVideo={setSelectedVideo} />
          <UpdateImage setSelectedImage={setSelectedImage} />
        </div>
        <button
          className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto mb-10"
          type="submit"
        >
          {isUpdateLoading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </section>
  );
}

export default EditCourse;
