function SelectCourse({ setCourseId, courses }) {
  return (
    <div className="w-full p-5 bg-secondary-500/40 rounded-lg font-mono">
      <label htmlFor="course" className="block text-text text-sm font-bold mb-2">
        Choose course
      </label>

      <select
        id="course"
        name="course"
        defaultValue=""
        onChange={(e) => setCourseId(e.target.value)}
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-accent-500 hover:shadow-lg hover:border-blue-300 bg-gray-100 text-black"
      >
        <option value="" disabled>
          -- Select a course --
        </option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectCourse
