import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setUsername, setEmail, setUserPassword, setUserConfirmPass, setUserRole } from "./signupSlice";

function SignupForm() {
  // Common classNames
  const inputFieldClassname = `w-full px-4 py-2 mb-4 border border-text-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-text-200 placeholder-accent-600 bg-background-900`;
  const loginButtonsClassName = `w-9 h-9 text-accent-500 bg-background-800 rounded-full hover:bg-background-700 focus:outline-none`;

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // Redux state
  const [usernameForm, setUsernameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [passwordForm, setPasswordForm] = useState('');
  const [passConfirmForm, setPassConfirmForm] = useState('');
  const [roleForm, setRoleForm] = useState('student'); // Default role

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (passwordForm !== passConfirmForm) {
      alert('Passwords do not match!');
      return;
    }

    // Log form data
    console.log({ usernameForm, emailForm, passwordForm, passConfirmForm, roleForm });

    // Dispatch Redux actions
    dispatch(setUsername(usernameForm));
    dispatch(setEmail(emailForm));
    dispatch(setUserPassword(passwordForm));
    dispatch(setUserConfirmPass(passConfirmForm));
    dispatch(setUserRole(roleForm));

    // Clear the form after submission
    setUsernameForm('');
    setEmailForm('');
    setPasswordForm('');
    setPassConfirmForm('');
    setRoleForm('student');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center p-8 bg-background-950">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-accent-200 font-poppins">Lumina</h1>
        <h2 className="text-lg text-accent-300">Light the dark / Learn Brighter</h2>
      </div>

      {/* Input Fields */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Username"
          className={inputFieldClassname}
          value={usernameForm}
          onChange={(e) => setUsernameForm(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          className={inputFieldClassname}
          value={emailForm}
          onChange={(e) => setEmailForm(e.target.value)}
        />

        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            className={inputFieldClassname}
            value={passwordForm}
            onChange={(e) => setPasswordForm(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-[1.3rem] -translate-y-1/2"
          >
            {isVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
          </button>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          className={inputFieldClassname}
          value={passConfirmForm}
          onChange={(e) => setPassConfirmForm(e.target.value)}
        />

        <select
          className={inputFieldClassname}
          value={roleForm}
          onChange={(e) => setRoleForm(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 mb-4 text-white bg-accent-500 rounded-lg hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 text-text-200 font-bold ease-in-out duration-300 capitalize"
        >
          Create Account
        </button>

        {/* Social Login Buttons */}
        <div className="flex justify-center my-4 space-x-4">
          <button type="button" className={loginButtonsClassName}>
            <i className="fa-brands fa-google"></i>
          </button>
          <button type="button" className={loginButtonsClassName}>
            <i className="fa-brands fa-github"></i>
          </button>
        </div>

        {/* Sign Up Section */}
        <div className="text-center">
          <h4 className="text-accent-300 capitalize">Already a member?</h4>
          <Link
            to="/login"
            className="text-primary-200 font-bold hover:text-primary-600 focus:outline-none"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;