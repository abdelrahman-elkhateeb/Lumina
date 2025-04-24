import PaymentForm from "./PaymentForm";
import PaymentSummery from "./PaymentSummery";

function Payment() {
  return (
    <section className="bg-background-500 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-background-700 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary-500 mb-6">Payment Details</h2>
        {/* Summary Section */}
        <PaymentSummery />
        {/* Payment Form */}
        <PaymentForm />
      </div>
    </section>
  );
}

export default Payment;
