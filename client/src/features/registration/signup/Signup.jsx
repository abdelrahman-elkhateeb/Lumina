import SignupForm from "./SignupForm";

function Signup() {
  return (
    <div
      className="grid place-content-center h-dvh relative bg-background 
      before:absolute before:bg-white before:w-96 before:h-96 before:rounded-full before:opacity-20 before:blur-3xl before:animate-move-across after:absolute after:bottom-0 after:right-0 after:w-96 after:h-96 after:bg-white after:rounded-full after:opacity-20 after:blur-3xl after:animate-move-across"
    >
      <SignupForm />
    </div>

  );
}

export default Signup;
