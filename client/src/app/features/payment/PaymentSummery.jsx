function PaymentSummery() {
  return (
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
  )
}

export default PaymentSummery
