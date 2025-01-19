
import ImageCarousel from "../../ui/ImageCarousel";
import SignupForm from "./SignupForm";

function Signup() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh">
      <ImageCarousel/>
      <SignupForm/>
    </div>
  );
}

export default Signup
