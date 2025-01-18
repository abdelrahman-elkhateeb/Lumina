import ImageCarousel from "./ImageCarousel";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh bg-background-50">
      {/* Login Form Section */}
      <LoginForm />
      {/* Image Section */}
      <ImageCarousel />
    </div>
  );
}

export default Login;
