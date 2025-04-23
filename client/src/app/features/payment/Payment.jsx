import PaymentForm from "./PaymentForm";
import PaymentSummery from "./PaymentSummery";

function Payment() {
  return (
    <section className="bg-background-500 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-background-700 rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
        {/* Payment Form */}
        <PaymentForm />

        {/* Summary Section */}
        <PaymentSummery />
      </div>
    </section>
  );
}

export default Payment;
