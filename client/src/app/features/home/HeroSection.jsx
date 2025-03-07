import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function heroSection() {
  return (
    <div className="flex items-center flex-col justify-center h-dvh text-center relative z-50">
      <motion.h1
        className="text-7xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Embark on a Learning Odyssey – Explore the Universe of Code!
      </motion.h1>
      <div className="flex justify-center items-center flex-col">
        <motion.h4
          className="text-2xl text-accent mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Chart your course through personalized lessons, hands-on coding, and cosmic projects to elevate your skills.
        </motion.h4>
        <motion.h4
          className="w-fit mt-4 p-3 rounded-lg bg-primary text-secondary font-bold hover:bg-accent transition"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <button>
            <Link to="/courses">Get Started</Link>
          </button>
        </motion.h4>
      </div>
    </div>
  )
}

export default heroSection;
