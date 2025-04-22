import { useEffect, useState } from "react";

function UpdateTitle({ setUpdatedData, selectedLessonTitle }) {
  const [title, setTitle] = useState(selectedLessonTitle || "");

  useEffect(() => {
    setTitle(selectedLessonTitle || "");
  }, [selectedLessonTitle]);

  const handleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Only update if the title is not empty
    setUpdatedData(prev => ({
      ...prev,
      title: newTitle.trim() === "" ? undefined : newTitle,
    }));
  };

  return (
    <div className="w-full p-5 bg-secondary-500/40 rounded-lg font-mono">
      <label htmlFor="" className="block text-text text-sm font-bold mb-2" >title</label>

      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="title"
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-accent-500 hover:shadow-lg hover:border-accent-700 bg-gray-100 text-black"
      />
    </div>
  );
}

export default UpdateTitle;
