import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import spaceMan from "../../../../public/assets/spaceman.svg";

function heroSection() {
  return (
    <div className="flex items-center flex-col justify-center h-[calc(100vh-78px)] text-center relative z-50">
      {/* light bulb */}
      <svg
        width="150"
        height="150"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bulb Base */}
        <rect x="90" y="140" width="20" height="30" fill="#555" />
        <rect x="85" y="160" width="30" height="10" fill="#777" />

        {/* Light Bulb (Flicker Effect) */}
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="yellow"
          className="animate-flicker"
        />

        {/* Glow Effect */}
        <circle
          cx="100"
          cy="100"
          r="50"
          fill="grey"
          className="opacity-10"
        />
      </svg>
      <motion.h1
        className="text-3xl md:text-7xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Embark on a Learning Odyssey – Explore the Universe of Code!
      </motion.h1>

      <div className="flex justify-center items-center flex-col">
        <motion.h4
          className="text-xl md:text-2xl text-accent mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Chart your course through personalized lessons, hands-on coding, and cosmic projects to elevate your skills.
        </motion.h4>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-7"
        >
          <Link to="/courses" className="bg-site-accent font-light p-4 rounded-lg">Get Started</Link>
        </motion.button>
        
      </div>
      <div className="">
        <img src={spaceMan} alt="Spaceman" style={{ display: "block", width: "200px", height: "auto" }} />

      </div>
    </div>
  )
}

export default heroSection;
