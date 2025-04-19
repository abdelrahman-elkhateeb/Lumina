import { useState } from "react";

function UpdateDescription({ setUpdatedData }) {
  const [description, setDescription] = useState('');

  const handleOnChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setUpdatedData(prev => ({ ...prev, description: newDescription }));
  }

  return (
    <div className="w-full p-5 bg-secondary-500/40 rounded-lg font-mono">
      <label htmlFor="" className="block text-text text-sm font-bold mb-2" >description</label>

      <input
        type="text"
        name="description"
        value={description}
        onChange={handleOnChange}
        placeholder="description"
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-accent-500 hover:shadow-lg hover:border-accent-700 bg-gray-100 text-black"
      />
    </div>
  )
}

export default UpdateDescription;
