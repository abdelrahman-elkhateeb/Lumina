import SignupForm from "./SignupForm";
import backgroundImg from "../../../../public/assets/background.png"

function Signup() {
  return (
    <div className="grid h-dvh">
      {/* illustration
      <RegistrationIllustration>
        <img src={img} alt="loginImage" />
      </RegistrationIllustration> */}
      {/* Signup form */}
      <SignupForm />
    </div>
  );
}

export default Signup;
