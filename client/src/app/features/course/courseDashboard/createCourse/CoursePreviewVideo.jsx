function CoursePreviewVideo({ handleFileChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">previewVideo</label>
      <input type="file" name="previewVideo" onChange={handleFileChange} />
    </div>
  )
}

export default CoursePreviewVideo
