import Button from "../../../ui/Button";
import { useState } from "react";

function Options({ options, onOptionsChange, correctOption, onCorrectOptionChange }) {
  const [newOption, setNewOption] = useState("");

  const handleAdd = () => {
    if (!newOption.trim()) return;
    const updatedOptions = [...options, newOption.trim()];
    onOptionsChange(updatedOptions);
    setNewOption("");
  };

  const handleDelete = (option) => {
    const updatedOptions = options.filter((opt) => opt !== option);
    onOptionsChange(updatedOptions);
    if (correctOption === option) {
      onCorrectOptionChange(null);
    }
  };

  return (
    <div className="w-full p-5 bg-secondary-500/40 rounded-lg font-mono">
      <label className="text-lg font-semibold">Options</label>

      {/* Input for new option */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Add a new option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-accent-500 hover:shadow-lg hover:border-accent-700 bg-gray-100 text-black"
        />
        <Button type="secondary" onClick={handleAdd}>
          Add
        </Button>
      </div>

      {/* List of added options */}
      <ul className="mt-5">
        {options.map((option, index) => (
          <li key={index} className="flex justify-between items-center gap-2 mt-5">
            <span>{option}</span>
            <div className="flex gap-2">
              <Button
                type="round"
                onClick={() => onCorrectOptionChange(option)}
                active={correctOption === option} 
              >
                {correctOption === option ? "Correct" : "Set Correct"}
              </Button>
              <Button type="round" onClick={() => handleDelete(option)}>
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Options;
