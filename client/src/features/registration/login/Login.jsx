import AnimatedBalls from "../../ui/AnimatedBalls";
import LoginForm from "./LoginForm";


function Signup() {
  return (
    <div className="grid place-content-center h-dvh w-dvw relative bg-background overflow-hidden">
      <AnimatedBalls />
      <LoginForm />
    </div>
  );
}

export default Signup;
