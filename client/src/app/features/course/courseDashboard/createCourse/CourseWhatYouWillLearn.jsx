import { useState } from "react";

function CourseWhatYouWillLearn({ formData, setFormData }) {
  const [newOutcome, setNewOutcome] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      whatYouWillLearn: [...formData.whatYouWillLearn, newOutcome],
    });
    setNewOutcome(""); // Clear input after adding
  };

  const handleDelete = (e, index) => {
    e.preventDefault(); // Prevents page refresh
    const updatedOutcomes = formData.whatYouWillLearn.filter((_, i) => i !== index);
    setFormData({ ...formData, whatYouWillLearn: updatedOutcomes });
  };

  return (
    <div className="flex flex-col">
      <label>What You Will Learn</label>
      {/* Add New Learning Outcome */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Add a new learning outcome"
          value={newOutcome}
          onChange={(e) => setNewOutcome(e.target.value)}
          className="p-1 border rounded text-black flex-grow"
        />
        <button onClick={handleAdd} className="px-2 py-1 bg-blue-500 text-white rounded">
          Add
        </button>
      </div>

      <ul>
        {formData.whatYouWillLearn.map((outcome, index) => (
          <li key={index} className="flex justify-between items-center gap-2 mt-2">
            <span>{outcome}</span>
            <button onClick={(e) => handleDelete(e, index)} className="px-2 py-1 bg-red-500 text-white rounded">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseWhatYouWillLearn;
