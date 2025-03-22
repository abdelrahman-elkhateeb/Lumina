import { useState } from "react";
import { useCreateCourseMutation } from "../../redux/courses/coursesApi";

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseImage: null, // File upload
    previewVideo: null, // File upload
    whatYouWillLearn: [""], // Multiple learning outcomes
    category: "Web Development",
    price: 0,
    enrollmentType: "Free",
  });

  const [createCourse, { isLoading, error }] = useCreateCourseMutation();

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  // Handle dynamic inputs for "What You Will Learn"
  const handleWhatYouWillLearnChange = (index, value) => {
    const updatedLearnings = [...formData.whatYouWillLearn];
    updatedLearnings[index] = value;
    setFormData({ ...formData, whatYouWillLearn: updatedLearnings });
  };

  const addLearningPoint = () => {
    setFormData({ ...formData, whatYouWillLearn: [...formData.whatYouWillLearn, ""] });
  };

  const removeLearningPoint = (index) => {
    const updatedLearnings = formData.whatYouWillLearn.filter((_, i) => i !== index);
    setFormData({ ...formData, whatYouWillLearn: updatedLearnings });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert form data to FormData for file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("enrollmentType", formData.enrollmentType);

    // Append each "whatYouWillLearn" point separately
    formData.whatYouWillLearn.forEach((point, index) => {
      formDataToSend.append(`whatYouWillLearn[${index}]`, point);
    });

    // Append files if they exist
    if (formData.courseImage) {
      formDataToSend.append("courseImage", formData.courseImage);
    }
    if (formData.previewVideo) {
      formDataToSend.append("previewVideo", formData.previewVideo);
    }

    try {
      await createCourse(formDataToSend).unwrap();
      alert("Course created successfully!");
      setFormData({
        title: "",
        description: "",
        courseImage: null,
        previewVideo: null,
        whatYouWillLearn: [""],
        category: "Web Development",
        price: 0,
        enrollmentType: "Free",
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-black bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="file"
          name="courseImage"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="file"
          name="previewVideo"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* What You Will Learn - Dynamic Input Fields */}
        <div>
          <label className="font-semibold">What You Will Learn:</label>
          {formData.whatYouWillLearn.map((point, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleWhatYouWillLearnChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={`Learning outcome ${index + 1}`}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeLearningPoint(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addLearningPoint}
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
          >
            + Add More
          </button>
        </div>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option>Web Development</option>
          <option>Data Science</option>
          <option>AI</option>
          <option>Cybersecurity</option>
          <option>Others</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Course Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <select
          name="enrollmentType"
          value={formData.enrollmentType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option>Free</option>
          <option>Paid</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Course"}
        </button>

        {error && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
}

export default CreateCourse;