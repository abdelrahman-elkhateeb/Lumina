import { useState } from "react";
import { useCreateCourseMutation } from "../../redux/courses/coursesApi";
import Button from "../../ui/Button";

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
  const [editingValue, setEditingValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const [createCourse, { isLoading, error }] = useCreateCourseMutation();

  const handleChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.price);
  };

  const handleFileChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingValue(formData.whatYouWillLearn[index]);
  };

  const handleSaveEdit = () => {
    const updateOutComes = [...formData.whatYouWillLearn];
    updateOutComes[editingIndex] = editingValue;
    setFormData({ ...formData, whatYouWillLearn: updateOutComes });
    setEditingIndex(null);
    setEditingValue("");
  }

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  return (
    <section className="max-w-2xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form action="">
        {/* title */}
        <div className="flex flex-col">
          <label htmlFor="">title</label>
          <input type="text" name="title" placeholder="title" className="p-2 rounded-lg text-black" onChange={handleChange} value={formData.title} />
        </div>
        {/* description */}
        <div className="flex flex-col">
          <label htmlFor="">description</label>
          <textarea type="text" name="description" placeholder="description" className="p-2 rounded-lg text-black" onChange={handleChange} value={formData.description} />
        </div>
        {/* category */}
        <div className="flex flex-col">
          <label htmlFor="">category</label>
          <select name="category" id="" className="p-2 rounded-lg text-black" value={formData.category}
            onChange={handleChange}>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="AI">AI</option>
            <option value="CyberSecurity">CyberSecurity</option>
          </select>
        </div>
        {/* price */}
        <div className="flex flex-col">
          <label htmlFor="">price</label>
          <input type="number" name="price" placeholder="price" className="p-2 rounded-lg text-black" onChange={handleChange} value={formData.price} min="0" />
        </div>
        {/* previewVideo */}
        <div className="flex flex-col">
          <label htmlFor="">previewVideo</label>
          <input type="file" name="previewVideo" onChange={handleFileChange} />
        </div>
        {/* courseImage */}
        <div className="flex flex-col">
          <label htmlFor="">courseImage</label>
          <input type="file" name="courseImage" onChange={handleFileChange} />
        </div>
        {/* whatYouWillLearn */}
        <div className="flex flex-col">
          <label htmlFor="">What You Will Learn</label>
          <ul>
            {formData.whatYouWillLearn.map((outcome, index) => (
              <li key={index} className="flex justify-between items-center gap-2 mt-2">
                {editingIndex === index ? (
                  // Edit Mode: Show Input
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    className="p-1 border rounded text-black"
                  />
                ) : (
                  // Normal Mode: Click to Edit
                  <span onClick={() => handleEdit(index)}>{outcome}</span>
                )}

                {/* Edit Mode: Show Save/Cancel Buttons */}
                {editingIndex === index ? (
                  <div>
                    <button onClick={handleSaveEdit} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                    <button onClick={handleCancelEdit} className="px-2 py-1 bg-gray-500 text-white rounded ml-2">Cancel</button>
                  </div>
                ) : (
                  // Normal Mode: Show Delete Button
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const updatedOutcomes = formData.whatYouWillLearn.filter((_, i) => i !== index);
                      setFormData({ ...formData, whatYouWillLearn: updatedOutcomes });
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Add New Learning Outcome */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Add a new learning outcome"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              className="p-1 border rounded text-black flex-grow"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (editingValue.trim()) {
                  setFormData({
                    ...formData,
                    whatYouWillLearn: [...formData.whatYouWillLearn, editingValue.trim()],
                  });
                  setEditingValue(""); // Clear input after adding
                }
              }}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>

        <button type="submit" className="bg-accent-500 px-2 py-1 mt-3 rounded-lg">
          submit
        </button>
      </form>
    </section>
  );
}

export default CreateCourse;