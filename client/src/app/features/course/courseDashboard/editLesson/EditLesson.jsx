import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import { Link, useParams } from "react-router-dom";
import {
  useGetCoursesQuery,
  useInstructorCoursesQuery,
  useUpdateLessonMutation
} from "../../../redux/courses/coursesApi";
import { useFetchUserDataQuery } from "../../../redux/auth/registrationApi";
import SelectSection from "../../../ui/SelectSection";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import { useState } from "react";
import SelectLesson from "./SelectLesson";
import UpdateTitle from "./UpdateTitle";
import UpdateVideo from "../../../ui/UpdateVideo";
import ErrorPage from "../../../ui/ErrorPage";

function EditLesson() {
  const { courseId } = useParams();
  const [sectionId, setSectionId] = useState(null);
  const [lessonId, setLessonId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const { data: userData, isLoading: userLoading, error: userError } = useFetchUserDataQuery();
  const isAdmin = userData?.data?.user.userType === "admin";

  const {
    data,
    isLoading,
    error,
  } = isAdmin ? useGetCoursesQuery() : useInstructorCoursesQuery();

  const [updateLesson, { isLoading: loadingUpdateLesson }] = useUpdateLessonMutation();

  if (isLoading || userLoading) return <LightBulbLoader />;
  if (error || userError) return <ErrorPage />;

  const courses = data?.courses;
  const selectedCourse = courses?.find(c => c._id === courseId);
  const selectedSection = selectedCourse?.sections?.find(s => s._id === sectionId);
  const selectedLesson = selectedSection?.lessons?.find(l => l._id === lessonId);
  const selectedLessonTitle = selectedLesson?.title;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lessonId) {
      alert("Please select a lesson to update.");
      return;
    }

    let payload;
    try {
      if (selectedVideo) {
        const formData = new FormData();
        formData.append("videoUrl", selectedVideo);
        Object.entries(updatedData).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value);
          }
        });
        payload = formData;
      } else {
        payload = updatedData;
      }

      await updateLesson({ courseId, lessonId, data: payload }).unwrap();

      setUpdatedData({});
      setSelectedVideo(null);
      alert("Lesson updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong while updating the lesson.");
    }
  };

  return (
    <section className="container mx-auto px-4">
      <Heading title="Edit your content here" img={spaceman} />

      <div className="flex justify-between">
        <Link
          to={`/section/manage/edit/${courseId}`}
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Update section
        </Link>
        <Link
          to={`/create/placement-test/${courseId}`}
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          Create placement test
        </Link>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {selectedCourse && (
          <SelectSection course={selectedCourse} setSectionId={setSectionId} />
        )}
        {selectedSection && (
          <SelectLesson section={selectedSection} setLessonId={setLessonId} />
        )}

        {lessonId && (
          <>
            <UpdateTitle setUpdatedData={setUpdatedData} selectedLessonTitle={selectedLessonTitle} />
            <UpdateVideo setSelectedVideo={setSelectedVideo} />
          </>
        )}

        <button
          type="submit"
          disabled={loadingUpdateLesson}
          className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto mb-10"
        >
          {loadingUpdateLesson ? "Updating..." : "Update lesson"}
        </button>
      </form>
    </section>
  );
}

export default EditLesson;
