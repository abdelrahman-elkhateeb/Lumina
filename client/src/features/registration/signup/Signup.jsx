import RegistrationIllustration from "../../ui/RegistrationIllustration";
import SignupForm from "./SignupForm";
import img from "../../../../public/assets/signup_page_img.svg";

function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh">
      {/* illustration */}
      <RegistrationIllustration>
        <img src={img} alt="loginImage" />
      </RegistrationIllustration>
      {/* Signup form */}
      <SignupForm />
    </div>
  );
}

export default Signup;
