import { Link } from "react-router-dom";
import ImageCarousel from "../login/ImageCarousel";

function Signup() {
  const inputFieldClassname = `w-full px-4 py-2 mb-4 border border-text-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-text-200 placeholder-accent-600 bg-background-900`

  const loginButtonsClassName=`w-9 h-9 text-accent-500 bg-background-800 rounded-full hover:bg-background-700 focus:outline-none`
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh">
      <ImageCarousel/>
    <form className="flex flex-col justify-center items-center p-8 bg-background-950">
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
        />
        <input
          type="password"
          placeholder="Password"
          className={inputFieldClassname}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 mb-4 text-white bg-accent-500 rounded-lg hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 text-text-200 font-bold ease-in-out duration-300"
        >
          Welcome back!
        </button>


        {/* Social Login Buttons */}
        <div className="flex justify-center my-4 space-x-4">
          <button
            type="button"
            className={loginButtonsClassName}
          >
            <i className="fa-brands fa-google"></i>
          </button>
          <button
            type="button"
            className={loginButtonsClassName}
          >
            <i className="fa-brands fa-github"></i>
          </button>
        </div>

        {/* Sign Up Section */}
        <div className="text-center">
          <h4 className="text-accent-300">Already have account</h4>
          <Link to="/login"
            type="button"
            className="text-primary-200 font-bold hover:text-primary-600 focus:outline-none"
          >
            Login
          </Link>
        </div>

      </div>
    </form>
    </div>
  );
}

export default Signup
