import { motion } from "framer-motion";

function Heading({ img, title }) {
  return (
    <div className="relative flex items-center mb-10 gap-4">
      {/* Animated Image */}
      <motion.div
        className="w-20"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img src={img} alt="Spaceman" className="w-full rounded-xl shadow-lg" />
      </motion.div>

      {/* Heading with Gradient and Hover Effect */}
      <motion.h1
        className="text-4xl font-extrabold bg-gradient-to-r from-site-primary to-site-accent bg-clip-text text-transparent capitalize cursor-pointer hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h1>

      {/* Stylish Divider */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1 bg-gradient-to-r from-site-primary to-site-accent rounded-full shadow-md" />
    </div>
  );
}

export default Heading;
