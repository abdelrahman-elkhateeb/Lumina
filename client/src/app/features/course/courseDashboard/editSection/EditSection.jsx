import Heading from "../../../ui/Heading";
import spaceman from "/public/assets/spaceMan(7).svg";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import UpdateSectionTitle from "./UpdateSectionTitle";
import {
  useGetCoursesQuery,
  useInstructorCoursesQuery,
  useUpdateSectionMutation
} from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import SelectSection from "../../../ui/SelectSection";
import ErrorPage from "../../../ui/ErrorPage";
import { useFetchUserDataQuery } from "../../../redux/auth/registrationApi";

function EditSection() {
  const { courseId } = useParams();
  const [updateData, setUpdatedData] = useState("");
  const [sectionId, setSectionId] = useState("");

  // Fetch user data
  const { data: userData, isLoading: userLoading } = useFetchUserDataQuery();
  const isAdmin = userData?.data?.user?.userType === "admin";

  // Fetch courses conditionally based on user type
  const {
    data: instructorData,
    isLoading: instructorLoading,
    error: instructorError,
  } = useInstructorCoursesQuery(undefined, { skip: isAdmin });

console.log(instructorData);


  const {
    data: allCoursesData,
    isLoading: allCoursesLoading,
    error: allCoursesError,
  } = useGetCoursesQuery(undefined, { skip: !isAdmin });

console.log(allCoursesData);


  const [updateSection, { isLoading: isUpdateLoading }] = useUpdateSectionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSection({ courseId, sectionId, data: updateData }).unwrap();
      alert("Section updated successfully");
    } catch (err) {
      console.log("Update failed", err);
      alert("Failed to update section");
    }
  };

  if (userLoading || instructorLoading || allCoursesLoading) return <LightBulbLoader />;
  if (instructorError || allCoursesError) return <ErrorPage />;

  const courses = isAdmin ? allCoursesData?.courses : instructorData?.courses;
  const selectedCourse = courses?.find((c) => c._id === courseId);

  return (
    <section className="container mx-auto px-4">
      <Heading title="Edit your content here" img="/public/assets/spaceMan(7).svg" />

      <div className="flex justify-between items-center">
        <Link
          to={`/courses/manage/edit/${courseId}`}
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Update course
        </Link>

        <Link
          to={`/create/placement-test/${courseId}`}
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          Create placement test
        </Link>

        <Link
          to={`/lesson/manage/edit/${courseId}`}
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          Update lesson
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {selectedCourse && <SelectSection setSectionId={setSectionId} course={selectedCourse} />}
        {sectionId && <UpdateSectionTitle setUpdatedData={setUpdatedData} />}
        <button
          className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto"
          type="submit"
        >
          {isUpdateLoading ? "Updating..." : "Update section"}
        </button>
      </form>
    </section>
  );
}

export default EditSection;
