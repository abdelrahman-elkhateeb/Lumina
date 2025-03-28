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
import Button from "../../../ui/Button";

function CreateCourse() {
  const [step, setStep] = useState(1);
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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async e => {
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
      setStep(1);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <section className="container mx-auto px-4">
      {/* <StarBackground /> */}
      <Heading title="create course" img={img} />
      <form onSubmit={handleSubmit}>
        {step === 1 && <CourseTitle handleChange={handleChange} title={formData.title} />}
        {step === 2 && <CourseDescription handleChange={handleChange} description={formData.description} />}
        {step === 3 && <CourseCategory handleChange={handleChange} category={formData.category} />}
        {step === 4 && <CoursePrice handleChange={handleChange} price={formData.price} />}
        {step === 5 && <CoursePreviewVideo handleFileChange={handleFileChange} />}
        {step === 6 && <CourseCourseImage handleFileChange={handleFileChange} />}
        {step === 7 && <CourseWhatYouWillLearn formData={formData} setFormData={setFormData} />}

        <div className="flex justify-between mt-4 relative z-50">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)} type="secondary">Previous</Button>
          )}
          {step < 7 ? (
            <Button type="primary" onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <button type="submit" disabled={isLoading} className="bg-green-500 inline-block text-sm rounded-full hover:bg-green-300 font-semibold uppercase tracking-wide text-text transition-colors duration-3000 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default CreateCourse;
