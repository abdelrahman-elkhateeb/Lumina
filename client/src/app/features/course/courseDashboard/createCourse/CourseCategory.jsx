function CourseCategory({ handleChange, category }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">category</label>
      <select name="category" id="" className="p-2 rounded-lg text-black" value={category}
        onChange={handleChange}>
        <option value="Web Development">Web Development</option>
        <option value="Data Science">Data Science</option>
        <option value="AI">AI</option>
        <option value="CyberSecurity">CyberSecurity</option>
      </select>
    </div>
  )
}

export default CourseCategory
