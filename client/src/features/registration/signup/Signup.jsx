import { motion } from "framer-motion";
import SignupForm from "./SignupForm";

function Signup() {
  return (
    <div className="grid place-content-center h-dvh w-dvw relative bg-background overflow-hidden">
      {/* Ball 1: Moves from top-left to center */}
      <motion.div
        className="absolute bg-white w-96 h-96 rounded-full opacity-20 blur-[190px]"
        initial={{ x: "-100%", y: "-100%" }} // Start from top-left
        animate={{ x: "0%", y: "0%" }} // Move to center
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Ball 2: Moves inversely (from bottom-right to center) */}
      <motion.div
        className="absolute bottom-0 right-0 bg-white w-96 h-96 rounded-full opacity-20 blur-[190px]"
        initial={{ x: "100%", y: "100%" }} // Start from bottom-right
        animate={{ x: "0%", y: "0%" }} // Move to center
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Signup Form */}
      <SignupForm />
    </div>
  );
}

export default Signup;
