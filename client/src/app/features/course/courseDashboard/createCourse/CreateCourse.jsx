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
import StarBackground from "../../../ui/StarBackground";
import LightBulbLoader from "../../../ui/LightBulbLoader";

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseImage: null,
    previewVideo: null,
    whatYouWillLearn: [],
    category: "Web Development",
    price: 0,
    enrollmentType: "Free",
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
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await createCourse(data).unwrap();
      console.log(response);
      setFormData({
        title: "",
        description: "",
        courseImage: null,
        previewVideo: null,
        whatYouWillLearn: [],
        category: "Web Development",
        price: 0,
        enrollmentType: "Free",
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <section className="container mx-auto px-4">
      <StarBackground />
      <Heading title="Create Course" img={img} />

      {isLoading ? (
        <LightBulbLoader />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-end">
          <CourseTitle handleChange={handleChange} title={formData.title} />
          <CourseDescription handleChange={handleChange} description={formData.description} />
          <CourseCategory handleChange={handleChange} category={formData.category} />
          <CoursePrice handleChange={handleChange} price={formData.price} />
          <CoursePreviewVideo handleFileChange={handleFileChange} />
          <CourseWhatYouWillLearn formData={formData} setFormData={setFormData} />
          <CourseCourseImage handleFileChange={handleFileChange} />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-400 transition-all duration-300"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </section>
  );
}

export default CreateCourse;
