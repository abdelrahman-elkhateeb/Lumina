import SpaceBackground from "../../ui/SpaceBackground";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="grid place-content-center h-dvh w-dvw relative bg-auth-background overflow-hidden">
      <SpaceBackground />
      <LoginForm />
    </div>
  );
}

export default Login;
