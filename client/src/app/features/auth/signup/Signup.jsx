import SignupForm from "./SignupForm";
import AnimatedBalls from "../../ui/AnimatedBalls";

function Signup() {
  return (
    <div className="grid place-content-center h-dvh w-dvw relative bg-background overflow-hidden">
      <AnimatedBalls />
      <SignupForm />
    </div>
  );
}

export default Signup;
