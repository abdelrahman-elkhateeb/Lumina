function CourseCourseImage({ handleFileChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">courseImage</label>
      <input type="file" name="courseImage" onChange={handleFileChange} />
    </div>
  )
}

export default CourseCourseImage;
