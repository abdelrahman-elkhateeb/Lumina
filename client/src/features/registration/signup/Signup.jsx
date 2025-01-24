import SignupForm from "./SignupForm";
import SignupIllustration from "./SignupIllustration";

function Signup() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh">
      <SignupIllustration />
      <SignupForm />
    </div>
  );
}

export default Signup
