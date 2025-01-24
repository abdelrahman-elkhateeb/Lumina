import LoginForm from "./LoginForm";
import LoginIllustration from "./LoginIllustration";

function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh">
      {/* Login Form Section */}
      <LoginForm />
      {/* Image Section */}
      <LoginIllustration />
    </div>
  );
}

export default Login;
