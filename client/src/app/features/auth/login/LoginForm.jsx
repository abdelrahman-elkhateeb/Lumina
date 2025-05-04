import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserDataQuery, useGoogleLoginMutation, useLoginUserMutation } from "../../redux/auth/registrationApi";
import Swal from "sweetalert2";

// Google function
import { signInWithGoogle } from "../auth";
import LightBulbLoader from "../../ui/LightBulbLoader";
import LoadingSpinner from "../../ui/LoadingSpinner";

function LoginForm() {
  // Common classNames
  const inputFieldClassname = `text-primary-700 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-accent-500 w-full`

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [googleLoginBackend] = useGoogleLoginMutation();
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
  const googleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      
      const idToken = await user.user.getIdToken();
      console.log("Google ID Token:", idToken);

      const response = await googleLoginBackend({ token: idToken }).unwrap();
      console.log("Backend response:", response);

      navigate("/");
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      Swal.fire({
        title: "Error!",
        background: "#e7fdfd",
        text: error.message || "Google Sign-In failed. Please try again.",
        icon: "error",
        confirmButtonText: "Try again 😊",
        confirmButtonColor: "#0a2629",
      });
    }
  };

  if (isLoading) return <LightBulbLoader />

  return (
    <form
      className="flex flex-col justify-center items-center p-8 rounded-2xl md:w-[500px] relative z-10"
      onSubmit={handleSubmit}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl text-primary-500 font-heading md:text-4xl font-bold">Lumina</h1>
        <h2 className="text-lg text-accent-500 font-body">Light the dark / Learn Brighter</h2>
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
            className="absolute right-3 top-[1.3rem] -translate-y-1/4 text-accent-500"
          >
            {isVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
          </button>
        </div>

        {/* Submit Button */}
        {!isLoading ? (
          <button
            type="submit"
            className="w-full mt-4 p-3 rounded-lg bg-primary-500 text-text hover:bg-primary-700 transition"
          >
            Login
          </button>
        ) : (
          < LoadingSpinner />
        )}

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 p-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition text-gray-700"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Continue with Google
        </button>


        {/* Sign Up Section */}
        <div className="text-center mt-4">
          <h4 className="text-text capitalize">Don't have an account?</h4>
          <Link
            to="/signup"
            className="text-accent-500 font-bold hover:text-accent-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>

  );
}

export default LoginForm;