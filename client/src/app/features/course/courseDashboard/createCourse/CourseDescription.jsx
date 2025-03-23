function CourseDescription({ description, handleChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">description</label>
      <textarea type="text" name="description" placeholder="description" className="p-2 rounded-lg text-black" onChange={handleChange} value={description} />
    </div>
  )
}

export default CourseDescription
