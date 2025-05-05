import { useSearchParams, useNavigate } from "react-router-dom";
import spaceMan from "../../../../public/assets/spaceMan.svg";
import { usePurchaseCoursesMutation } from "../redux/courses/coursesApi";
import { useState } from "react";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const courseIds = searchParams.get("courseIds")?.split(",").filter(id => id) || [];

  const [purchaseCourses] = usePurchaseCoursesMutation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePurchase = async () => {
    if (courseIds.length === 0) {
      setStatus("error");
      setErrorMessage("No valid course IDs provided.");
      return;
    }

    setStatus("loading");
    try {
      await purchaseCourses(courseIds).unwrap();
      setStatus("success");
      setTimeout(() => {
        navigate("/courses/myCourses");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error?.data?.message || "Something went wrong.");
      console.error("Purchase error:", error);
    }
  };

  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-52">
          <img src={spaceMan} alt="Spaceman" className="w-full" />
        </div>

        {status === "idle" && (
          <button
            onClick={handlePurchase}
            disabled={courseIds.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Confirm Purchase
          </button>
        )}

        {status === "loading" && (
          <p className="text-xl font-semibold">Processing your purchase...</p>
        )}
        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h1>
            <p>Thank you for your purchase! Redirecting to My Courses...</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-red-600">Purchase Failed</h1>
            <p>{errorMessage || "An error occurred. Please try again."}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default PaymentSuccess;