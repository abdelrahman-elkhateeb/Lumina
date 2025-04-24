import { useDispatch } from "react-redux"

function PaymentForm() {
  const dispatch = useDispatch();
  

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-500 mb-6">Payment Details</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Cardholder Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            className="w-full px-4 py-2 rounded-lg bg-background-500 border border-primary-700 placeholder-white focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-2 rounded-lg bg-background-500 border border-primary-700 placeholder-white focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">Expiration</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-4 py-2 rounded-lg bg-background-500 border border-primary-700 placeholder-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full px-4 py-2 rounded-lg bg-background-500 border border-primary-700 placeholder-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
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
