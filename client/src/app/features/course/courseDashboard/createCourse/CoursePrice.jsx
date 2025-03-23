function CoursePrice({ price, handleChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">price</label>
      <input type="number" name="price" placeholder="price" className="p-2 rounded-lg text-black" onChange={handleChange} value={price} min="0" />
    </div>
  )
}

export default CoursePrice
