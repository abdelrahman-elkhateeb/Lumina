import StarBackground from "../../ui/StarBackground";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="grid place-content-center h-dvh w-dvw relative bg-auth-background overflow-hidden">
      <StarBackground />
      <LoginForm />
    </div>
  );
}

export default Login;
