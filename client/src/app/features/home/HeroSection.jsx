import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function heroSection() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center relative">
      <motion.h1
        className="text-7xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Learn, Code, Succeed – Your Journey Starts Here!
      </motion.h1>

      <motion.h4
        className="text-2xl text-accent mt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        Personalized courses, hands-on coding, and real-world projects to boost your skills.
      </motion.h4>
    </div>
  )
}

export default heroSection;
