import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// sweetAlert
import Swal from 'sweetalert2'
import { useSignupUserMutation } from "../../redux/auth/registrationApi";

//google function
import { signInWithGoogle } from "../auth";
import { useFetchUserDataQuery } from "../../redux/auth/registrationApi";

function SignupForm() {
  // Common classNames
  const inputFieldClassname = `text-primary-500 rounded-xl placeholder:text-primary-500 p-3 focus:outline-none focus:ring-2 focus:ring-accent-500 w-full`;

  const navigate = useNavigate();

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
  const [genderForm, setGenderForm] = useState('male'); // Default gender

  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const { refetch } = useFetchUserDataQuery();

  // local signUp
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (passwordForm !== passConfirmForm) {
      Swal.fire({
        title: 'Error!',
        background: "#e7fdfd",
        text: 'Password does not match the confirm password',
        icon: 'error',
        confirmButtonText: 'Try again 😊',
        confirmButtonColor: "#0a2629",
      });
      return;
    }

    try {
      // Call the signupUser mutation
      await signupUser({
        name: usernameForm,
        email: emailForm,
        password: passwordForm,
        passwordConfirm: passConfirmForm,
        userType: roleForm,
        gender: genderForm
      }).unwrap();

      await refetch();

      // Clear the form after successful submission
      setUsernameForm('');
      setEmailForm('');
      setPasswordForm('');
      setPassConfirmForm('');
      setRoleForm('student');
      setGenderForm("male");
      navigate("/");

    } catch (err) {
      // Show error message
      Swal.fire({
        title: 'Error!',
        background: "#e7fdfd",
        text: err.data?.message || 'Signup failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try again 😊',
        confirmButtonColor: "#0a2629",
      });
    }
  };

  // google SignUp
  // const googleSignUp = async () => {
  //   try {
  //     const user = await signInWithGoogle();
  //     console.log(user);

  //     await signupUser({
  //       name: user.displayName,
  //       email: user.email,
  //       userType: roleForm,
  //       gender: genderForm
  //     }).unwrap();

  //     // Save the token to localStorage (if your Google auth returns a token)
  //     if (user.token) {
  //       localStorage.setItem("token", user.token); // Save token to localStorage
  //     }

  //     navigate("/");
  //   } catch (error) {
  //     console.error("Google Sign-In failed:", error);
  //     // Show error message using Swal
  //     Swal.fire({
  //       title: 'Error!',
  //       background: "#e7fdfd",
  //       text: error.message || 'Google Sign-In failed. Please try again.',
  //       icon: 'error',
  //       confirmButtonText: 'Try again 😊',
  //       confirmButtonColor: "#0a2629",
  //     });
  //   }
  // }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center p-8 rounded-2xl md:w-[500px] relative z-10">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-primary-500 font-poppins font-heading">Lumina</h1>
        <h2 className="text-lg font-body text-accent-500">Light the dark / Learn Brighter</h2>
      </div>

      {/* Input Fields */}
      <div className="w-full gap-4 flex flex-col max-w-md">
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
            className="absolute right-3 top-[1.3rem] -translate-y-1/4 text-accent-500"
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

        <select
          className={inputFieldClassname}
          value={genderForm}
          onChange={(e) => setGenderForm(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Submit Button */}
        {!isLoading ? (
          <button
            type="submit"
            className="w-full px-4 py-2 mb-4 bg-primary-500 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500 ease-in-out duration-300 capitalize"
          >
            Create Account
          </button>
        ) : (
          <p className="text-text">Loading...</p>
        )}

        {/* Sign Up Section */}
        <div className="text-center">
          <h4 className="text-text capitalize">Already a member?</h4>
          <Link
            to="/login"
            className="text-accent-500 font-bold hover:text-accent-700 focus:outline-none font-accent"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;