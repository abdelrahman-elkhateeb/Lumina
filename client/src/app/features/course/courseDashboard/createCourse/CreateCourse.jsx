import { useState } from "react";
import { useCreateCourseMutation } from "../../../redux/courses/coursesApi";
import CourseTitle from "./CourseTitle";
import CourseDescription from "./CourseDescription";
import CourseCategory from "./CourseCategory";
import CoursePrice from "./CoursePrice";
import CoursePreviewVideo from "./CoursePreviewVideo";
import CourseCourseImage from "./CourseCourseImage";
import CourseWhatYouWillLearn from "./CourseWhatYouWillLearn";
import Heading from "../../../ui/Heading";
import img from "../../../../../../public/assets/spaceMan(8).svg";
import LoadingUpload from "../../../ui/LoadingUpload";

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseImage: null,
    previewVideo: null,
    whatYouWillLearn: [],
    category: "Web Development",
    price: 0,
  });


  const [createCourse, { isLoading, error }] = useCreateCourseMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "whatYouWillLearn") {
        data.append(key, JSON.stringify(value)); // Ensure array is properly formatted
      } else if (value !== null) {
        data.append(key, value);
      }
    });

    try {
      await createCourse(data).unwrap();

      setFormData({
        title: "",
        description: "",
        courseImage: null,
        previewVideo: null,
        whatYouWillLearn: [],
        category: "Web Development",
        price: 0,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    isLoading ? (
      <LoadingUpload />
    ) : (
      <section className="container mx-auto px-4 pb-8">
        <Heading title="Create Course" img={img} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-end">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
            <CourseTitle handleChange={handleChange} title={formData.title} />
            <CourseDescription handleChange={handleChange} description={formData.description} />
            <CourseCategory handleChange={handleChange} category={formData.category} />
            <CoursePrice handleChange={handleChange} price={formData.price} />
            <CoursePreviewVideo handleFileChange={handleFileChange} />
            <CourseCourseImage handleFileChange={handleFileChange} />
          </div>
          <CourseWhatYouWillLearn formData={formData} setFormData={setFormData} />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-400 transition-all duration-300"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    )
  );
}

export default CreateCourse;
