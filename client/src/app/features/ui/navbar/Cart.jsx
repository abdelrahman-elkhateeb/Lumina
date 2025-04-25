import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cart/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  console.log(cart);


  const dispatch = useDispatch();
  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart(courseId));
  }

  return (
    <div className="">
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
        <div className="absolute right-4 mt-2 w-96 bg-background-500 border border-primary-500 rounded-xl shadow-lg z-50">
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
            {cart.cartItems.length === 0 ? (
              <p className="text-sm text-gray-300">Cart is empty</p>
            ) : (
              <ul className="space-y-2 max-h-60 ">
                {cart.cartItems.map((course) => (
                  <li key={course._id} className="flex justify-between items-center">
                    <span className="text-sm">{course.title}</span>
                    <div className="flex justify-center items-center gap-3">
                      <span className="text-sm text-accent-500">${course.price}</span>
                      <button onClick={() => {
                        handleRemoveFromCart(course._id);
                        setIsCartOpen(!isCartOpen);
                      }} className="material-symbols-outlined hover:text-red-500">
                        delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cart.cartItems.length > 0 && (
              <>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-accent-500 font-semibold">
                    ${cart.totalPrice.toFixed(2)}
                  </span>
                </div>
                <Link
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  to="/payment"
                  className="mt-4 block text-center w-full bg-accent-500 text-[#0A0A24] py-2 rounded-lg font-semibold hover:bg-accent-400 transition"
                >
                  Proceed to Payment
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
