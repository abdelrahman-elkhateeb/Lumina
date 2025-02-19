import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../app/features/auth/registrationApi";
import Swal from "sweetalert2";

// Google function
import { signInWithGoogle } from "../auth";

function LoginForm() {
  // Common classNames
  const inputFieldClassname = `bg-secondary text-primary border border-[#252525] rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-accent w-full`

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
      await loginUser({ email, password }).unwrap();

      // No need to store token manually, it's handled via cookies
      setEmail("");
      setPassword("");

      // Redirect to home page
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

  return (
    <form
      className="flex flex-col justify-center items-center p-8 rounded-2xl md:w-[500px]"
      onSubmit={handleSubmit}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl text-primary font-heading md:text-4xl font-bold">Lumina</h1>
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
            className="absolute right-3 top-[1.3rem] -translate-y-1/4 text-accent"
          >
            {isVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
          </button>
        </div>

        {/* Submit Button */}
        {!isLoading ? (
          <button
            type="submit"
            className="w-full mt-4 p-3 rounded-lg bg-primary text-secondary font-bold hover:bg-accent transition"
          >
            Login
          </button>
        ) : (
          <button
            disabled
            className="w-full mt-4 p-3 rounded-lg bg-light-secondary bg-primary text-secondary font-bold opacity-75"
          >
            Welcome back...
          </button>
        )}

        {/* Sign Up Section */}
        <div className="text-center mt-4">
          <h4 className="text-text capitalize">Don't have an account?</h4>
          <Link
            to="/signup"
            className="text-text font-bold hover:text-accent focus:outline-none font-accent"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>

  );
}

export default LoginForm;