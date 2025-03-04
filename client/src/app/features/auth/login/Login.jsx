import StarBackground from "../../ui/starBackground";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="grid place-content-center h-dvh w-dvw relative bg-background overflow-hidden">
      <StarBackground />
      <LoginForm />
    </div>
  );
}

export default Login;
