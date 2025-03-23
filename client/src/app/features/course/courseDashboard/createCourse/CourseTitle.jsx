function CourseTitle({ title, handleChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">title</label>
      <input type="text" name="title" placeholder="title" className="p-2 rounded-lg text-black" onChange={handleChange} value={title} />
    </div>
  )
}

export default CourseTitle
