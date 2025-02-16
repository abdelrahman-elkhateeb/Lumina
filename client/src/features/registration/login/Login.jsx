import RegistrationIllustration from "../../ui/RegistrationIllustration";
import LoginForm from "./LoginForm";
import img from "../../../../public/assets/login_page_image.svg";

function Login() {
  return (
    <div
      className="grid place-content-center h-dvh bg-gradient-to-br from-light-primary via-light-secondary to-light-accent animate-gradient-move bg-[length:200%_200%]"
    >
      <LoginForm />
    </div>

  );
}

export default Login;
