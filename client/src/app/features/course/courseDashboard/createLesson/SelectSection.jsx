function SelectSection({ courses }) {
  console.log(courses);

  return (
    <div className="w-full p-5 bg-secondary-500/40 rounded-lg font-mono">
      <label htmlFor="" className="block text-text text-sm font-bold mb-2" >choose section</label>

      <select
        id="section"
        name="section"
        defaultValue=""
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-accent-500 hover:shadow-lg hover:border-blue-300 bg-gray-100 text-black"
      >
        <option value="" disabled>
          -- Select a section --
        </option>
        {courses.sections.map((section) => (
          <option key={section._id} value={section._id}>
            {section.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectSection;
