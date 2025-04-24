import { useSelector } from "react-redux"
import { useProcessPaymentMutation } from "../redux/cart/paymentApi";
import { useFetchUserDataQuery } from "../redux/auth/registrationApi";

function PaymentForm() {
  const cartDetails = useSelector(state => state.cart);
  const [processPayment, { isLoading, error }] = useProcessPaymentMutation();
  const { data, isLoading: userLoading, error: userError } = useFetchUserDataQuery();
  const userId = data?.data?.user?._id;

  const handleSubmitcart = async (e) => {
    e.preventDefault();

    if (!cartDetails.cartItems || cartDetails.cartItems.length === 0)
      return alert("Please choose a course to buy");

    try {
      const res = await processPayment({ userId, cartItems: cartDetails.cartItems }).unwrap();
      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate payment. Try again.");
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmitcart}>
        <button
          type="submit"
          className="w-full mt-6 bg-primary-500 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          Pay Now
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
