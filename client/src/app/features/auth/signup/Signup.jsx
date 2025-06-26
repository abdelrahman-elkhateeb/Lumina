import SpaceBackground from "../../ui/SpaceBackground";
import SignupForm from "./SignupForm";


function Signup() {
  return (
    <div className="grid place-content-center h-dvh w-dvw relative bg-background overflow-hidden">
      <SpaceBackground />
      <SignupForm />
    </div>
  );
}

export default Signup;
