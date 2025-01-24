import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../registrationApi";
import Swal from "sweetalert2";

// Google function
import { signInWithGoogle } from "../auth";

function LoginForm() {
  // Common classNames
  const inputFieldClassname = `w-full px-4 py-2 mb-4 border border-text-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-text-200 placeholder-accent-600 bg-background-900`;

  const loginButtonsClassName = "w-full capitalize px-4 py-2 mb-4 text-white bg-background-300 rounded-lg hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 text-text-200 font-bold ease-in-out duration-300";

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // Redux
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  // Default login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the loginUser mutation to authenticate the user
      const userData = await loginUser({ email, password }).unwrap();

      // Save the token to localStorage
      localStorage.setItem("token", userData.token);


      // Clear the form fields after successful submission
      setEmail("");
      setPassword("");

      // Redirect to the home page
      navigate("/");
    } catch (err) {
      // Show error message
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

  return (
    <form
      className="flex flex-col justify-center items-center p-8 bg-background-950"
      onSubmit={handleSubmit}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-accent-200 font-poppins">Lumina</h1>
        <h2 className="text-lg text-accent-300">Light the dark / Learn Brighter</h2>
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
        <div className="relative">
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
            className="absolute right-3 top-[1.3rem] -translate-y-1/2"
          >
            {isVisible ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </button>
        </div>

        {/* Submit Button */}
        {!isLoading ? (
          <button
            type="submit"
            className={loginButtonsClassName}
          >
            login
          </button>
        ) : (
          <button disabled className={loginButtonsClassName}>welcome back....</button>
        )}

        {/* Social Login Buttons */}
        {/* <div className="flex justify-center my-4 space-x-4">
          <button
            type="button"
            className={loginButtonsClassName}
            onClick={googleLogin}
          >
            <i className="fa-brands fa-google"></i>
          </button>
          <button type="button" className={loginButtonsClassName}>
            <i className="fa-brands fa-github"></i>
          </button>
        </div> */}

        {/* Sign Up Section */}
        <div className="text-center">
          <h4 className="text-accent-300">Don't have an account?</h4>
          <Link
            to="/signup"
            type="button"
            className="text-primary-200 font-bold hover:text-primary-600 focus:outline-none"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;