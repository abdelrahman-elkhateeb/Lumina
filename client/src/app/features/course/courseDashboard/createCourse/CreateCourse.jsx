import { useState } from "react";
import { useCreateCourseMutation } from "../../../redux/courses/coursesApi";
import CourseTitle from "./CourseTitle";
import CourseDescription from "./CourseDescription";
import CourseCategory from "./CourseCategory";
import CoursePrice from "./CoursePrice";
import CoursePreviewVideo from "./CoursePreviewVideo";
import CourseCourseImage from "./CourseCourseImage";
import CourseWhatYouWillLearn from "./CourseWhatYouWillLearn";

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseImage: null, // File upload
    previewVideo: null, // File upload
    whatYouWillLearn: [], // Multiple learning outcomes
    category: "Web Development",
    price: 0,
    enrollmentType: "Free",
  });
  
  const [createCourse, { isLoading, error }] = useCreateCourseMutation();

  const handleChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.title);
  };

  const handleFileChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  return (
    <section className="max-w-2xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form action="">
        {/* title */}
        <CourseTitle handleChange={handleChange} title={formData.title} />
        {/* description */}
        <CourseDescription handleChange={handleChange} description={formData.description} />
        {/* category */}
        <CourseCategory handleChange={handleChange} category={formData.category} />
        {/* price */}
        <CoursePrice handleChange={handleChange} price={formData.price} />
        {/* previewVideo */}
        <CoursePreviewVideo handleFileChange={handleFileChange} />
        {/* courseImage */}
        <CourseCourseImage handleFileChange={handleFileChange} />
        {/* whatYouWillLearn */}
        <CourseWhatYouWillLearn formData={formData} setFormData={setFormData} />

        <button type="submit" className="bg-accent-500 px-2 py-1 mt-3 rounded-lg">
          submit
        </button>
      </form>
    </section>
  );
}

export default CreateCourse;