import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function heroSection() {
  return (
    <div className="flex items-center h-screen text-center relative">
      <motion.h1
        className="text-7xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Learn, Code, Succeed – Your Journey Starts Here!
      </motion.h1>

      <div className="flex justify-center items-center flex-col">
        <motion.h4
          className="text-2xl text-accent mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Personalized courses, hands-on coding, and real-world projects to boost your skills.
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
