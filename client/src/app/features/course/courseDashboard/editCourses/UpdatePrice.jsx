import { useState } from "react"

function UpdatePrice({ setUpdatedData }) {
  const [price, setPrice] = useState("");

  const handleChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    setUpdatedData((prevData) => ({ ...prevData, price: newPrice }));
  }
  return (
    <div className="w-full p-5 bg-secondary-500/40 rounded-lg font-mono">
      <label htmlFor="" className="block text-text text-sm font-bold mb-2" >price</label>

      <input
        type="number"
        name="price"
        placeholder="price"
        value={price}
        onChange={handleChange}
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-accent-500 hover:shadow-lg hover:border-accent-700 bg-gray-100 text-black"
      />
    </div>
  )
}

export default UpdatePrice;
