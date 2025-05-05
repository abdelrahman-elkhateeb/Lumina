import Heading from "../../../ui/Heading";
import spaceman from "../../../../../../public/assets/spaceMan(7).svg";
import SelectCourse from "./SelectCourse";
import { useCreateLessonMutation, useInstructorCoursesQuery } from "../../../redux/courses/coursesApi";
import LightBulbLoader from "../../../ui/LightBulbLoader";
import SelectSection from "../../../ui/SelectSection";
import { useState } from "react";
import ErrorPage from "../../../ui/ErrorPage";
import SetTitle from "./SetTitle";
import SetDescription from "./SetDescription";
import SetLessonVideo from "./SetLessonVideo";
import { Link } from "react-router-dom";

function CreateLesson() {
  const { data, isLoading, error } = useInstructorCoursesQuery();
  const [createLesson, { loading, err }] = useCreateLessonMutation();
  const [selectCourseId, setSelectedCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    // description: "",
    video: null,
    sectionId: "",
    course: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const lessonForm = new FormData();

    lessonForm.append("title", formData.title);
    // lessonForm.append("description", formData.description);
    lessonForm.append("video", formData.video); // File object
    lessonForm.append("courseId", selectCourseId);
    lessonForm.append("sectionId", sectionId);

    try {
      await createLesson(lessonForm).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <LightBulbLoader />;
  if (error) return <ErrorPage />;

  const courses = data.courses;
  const selectedCourse = courses.find(c => c._id === selectCourseId)

  return (
    <section className="container mx-auto px-4">
      <Heading title="create lesson" img={spaceman} />

      <div className="flex justify-between">
        <Link
          to="/courses/section/create"
          className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          <span className="material-symbols-outlined">
            arrow_back
          </span>
          create section
        </Link>

        <Link to="/create/placement-test" className="w-fit mb-4 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 flex items-center gap-2 justify-center">create placement test</Link>
      </div>

      <form action="" className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <SelectCourse courses={courses} setSelectedCourseId={setSelectedCourseId} />
          {selectedCourse && <SelectSection course={selectedCourse} setSectionId={setSectionId} />}
          <SetTitle handleChange={handleChange} />
          {/* <SetDescription handleChange={handleChange} /> */}
          <SetLessonVideo handleFileChange={handleFileChange} />
        </div>
        <button className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto" type="submit">
          {isSubmitting ? "Creating..." : "Create Lesson"}
        </button>
      </form>
    </section>
  )
}

export default CreateLesson;
