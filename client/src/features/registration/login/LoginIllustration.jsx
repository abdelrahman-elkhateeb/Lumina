import img from "../../../../public/assets/login_page_image.svg";

function LoginIllustration() {
  return (
    <section className="hidden bg-background-900 md:block h-dvh p-4 md:p-20">
      <img src={img} alt="image" className="animate" />
    </section>
  )
}

export default LoginIllustration
