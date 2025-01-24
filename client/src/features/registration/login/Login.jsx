import RegistrationIllustration from "../../ui/RegistrationIllustration";
import LoginForm from "./LoginForm";
import img from "../../../../public/assets/login_page_image.svg";

function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh">
      {/* Login Form Section */}
      <LoginForm />
      {/* Image Section */}
      <RegistrationIllustration>
        <img src={img} alt="signUpImage" />
      </RegistrationIllustration>
    </div>
  );
}

export default Login;
