import { useState } from "react";
import { useSelector } from "react-redux";

function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  return (
    <div className="relative">
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="relative text-white hover:text-accent-500 transition"
      >

        <span className="material-symbols-outlined mt-2">shopping_cart</span>
        {cart.totalItems > 0 && (
          <span className="absolute top-0 bg-accent-500 text-[#0A0A24] text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cart.totalItems}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-background-500 border border-primary-500 rounded-xl shadow-lg z-50">
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
            {cart.courses.length === 0 ? (
              <p className="text-sm text-gray-300">Cart is empty</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {cart.courses.map((course) => (
                  <li key={course._id} className="flex justify-between items-center">
                    <span className="text-sm">{course.title}</span>
                    <span className="text-sm text-accent-500">${course.price}</span>
                  </li>
                ))}
              </ul>
            )}
            {cart.courses.length > 0 && (
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-accent-500 font-semibold">${cart.total.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
