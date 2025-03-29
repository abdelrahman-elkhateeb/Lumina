import { useState } from "react";
import Button from "../../../ui/Button";

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
    <div className="w-full p-5 bg-secondary-500/40 rounded-lg font-mono">
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
        <Button type="secondary" onClick={handleAdd}>
          Add
        </Button>
      </div>

      <ul>
        {formData.whatYouWillLearn.map((outcome, index) => (
          <li key={index} className="flex justify-between items-center gap-2 mt-2">
            <span>{outcome}</span>
            <Button type="round" onClick={(e) => handleDelete(e, index)} c>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseWhatYouWillLearn;
