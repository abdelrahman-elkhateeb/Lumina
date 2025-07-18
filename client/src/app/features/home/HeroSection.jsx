import { motion } from "framer-motion";
import SpaceBackground from "../ui/SpaceBackground";
import Button from "../ui/Button"

function heroSection() {
  return (
    <section className="grid grid-cols-1 place-content-center md:grid-cols-2 h-[calc(100vh-78px)] relative">
      <SpaceBackground />

      <div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src="/public/assets/spaceman(5).svg"
            alt="Spaceman"
            className="w-full"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-50 grid place-content-center">
        <motion.h1
          className="text-3xl md:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        >
          Embark on a Learning Odyssey – Explore the Universe of Code!
        </motion.h1>

        <div className="">
          <motion.h4
            className="text-xl md:text-2xl text-accent-500 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          >
            Chart your course through personalized lessons, hands-on coding, and cosmic projects to elevate your skills.
          </motion.h4>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
            className="mt-7"
          >
            <Button type="primary" to='/courses/explore-courses'>
              explore courses
            </Button>
          </motion.button>
        </div>
      </div>
      <button className='bg-accent-500 w-[50px] text-center h-[50px] rounded-[50%] flex justify-center items-center animate-bounce absolute bottom-11 right-1/2'>
        <i className="fa-solid fa-arrow-down"></i>
      </button>
    </section>
  )
}

export default heroSection;
