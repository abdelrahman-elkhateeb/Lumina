import img from "../../../../public/assets/signup_page_img.svg";

function SignupIllustration() {
  return (
    <section className="hidden bg-background-900 md:block h-dvh p-4 md:p-20 cursor-grab">
      <img src={img} alt="image" />
    </section>
  )
}

export default SignupIllustration;
