import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserDataQuery, useLoginUserMutation } from "../../redux/auth/registrationApi";
import Swal from "sweetalert2";

// Google function
import { signInWithGoogle } from "../auth";
import LightBulbLoader from "../../ui/LightBulbLoader";
import LoadingSpinner from "../../ui/LoadingSpinner";

function LoginForm() {
  // Common classNames
  const inputFieldClassname = `text-primary-700 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-accent w-full`

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { refetch } = useFetchUserDataQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser({ email, password }).unwrap();

      await refetch();

      setEmail("");
      setPassword("");

      navigate("/");

    } catch (err) {
      Swal.fire({
        title: "Error!",
        background: "#e7fdfd",
        text: err.data?.message || "Login failed. Please try again.",
        icon: "error",
        confirmButtonText: "Try again 😊",
        confirmButtonColor: "#0a2629",
      });
    }
  };

  // Google login
  // const googleLogin = async () => {
  //   try {
  //     const user = await signInWithGoogle();
  //     console.log("Signed in user:", user);

  //     // Save the token to localStorage (if your Google auth returns a token)
  //     if (user.token) {
  //       localStorage.setItem("token", user.token); // Save token to localStorage
  //     }

  //     // Redirect or update UI after successful sign-in
  //     navigate("/"); // Redirect to the home page or dashboard
  //   } catch (error) {
  //     console.error("Google Sign-In failed:", error);
  //     // Show error message using Swal
  //     Swal.fire({
  //       title: "Error!",
  //       background: "#e7fdfd",
  //       text: error.message || "Google Sign-In failed. Please try again.",
  //       icon: "error",
  //       confirmButtonText: "Try again 😊",
  //       confirmButtonColor: "#0a2629",
  //     });
  //   }
  // };
  if (isLoading) return <LightBulbLoader />
  return (
    <form
      className="flex flex-col justify-center items-center p-8 rounded-2xl md:w-[500px] relative z-10"
      onSubmit={handleSubmit}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl text-primary-500 font-heading md:text-4xl font-bold">Lumina</h1>
        <h2 className="text-lg text-text font-body">Light the dark / Learn Brighter</h2>
      </div>

      {/* Input Fields */}
      <div className="w-full max-w-md">
        <input
          type="email"
          placeholder="Email address"
          className={inputFieldClassname}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative mt-4">
          <input
            type={isVisible ? "text" : "password"}
            placeholder="Confirm Password"
            className={inputFieldClassname}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-[1.3rem] -translate-y-1/4 text-auth-accent"
          >
            {isVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
          </button>
        </div>

        {/* Submit Button */}
        {!isLoading ? (
          <button
            type="submit"
            className="w-full mt-4 p-3 rounded-lg bg-primary-500 text-text font-bold hover:bg-primary-700 transition"
          >
            Login
          </button>
        ) : (
          < LoadingSpinner />
        )}

        {/* Sign Up Section */}
        <div className="text-center mt-4">
          <h4 className="text-auth-text capitalize">Don't have an account?</h4>
          <Link
            to="/signup"
            className="text-auth-text font-bold hover:text-accent focus:outline-none font-accent"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>

  );
}

export default LoginForm;