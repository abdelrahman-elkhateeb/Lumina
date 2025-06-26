import StarBackground from "../../ui/StarBackground.jsx";
import SignupForm from "./SignupForm";


function Signup() {
  return (
    <div className="grid place-content-center h-dvh w-dvw relative bg-background overflow-hidden">
      <StarBackground />
      <SignupForm />
    </div>
  );
}

export default Signup;
