function Payment() {
  return (
    <section className="bg-background-500 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-background-700 rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
        {/* Payment Form */}
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

        {/* Summary Section */}
        <div className="bg-background-500 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-secondary-500 mb-4">Order Summary</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between border-b border-background-700 pb-2">
              <span>Course: Full-Stack Development</span>
              <span>$199</span>
            </li>
            <li className="flex justify-between border-b border-background-700 pb-2">
              <span>Discount</span>
              <span>-$50</span>
            </li>
            <li className="flex justify-between font-bold pt-2">
              <span>Total</span>
              <span>$149</span>
            </li>
          </ul>
          <p className="text-xs text-accent-500 mt-4">
            By proceeding, you agree to Lumina's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Payment;
