import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CustomButton from "./CustomButton";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24, duration: 1.5 }, // Increased duration
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24, duration: 1.5 }, // Increased duration
  },
};

const Strategy = ({ strategy, contactMePictureURL }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.3, // Trigger when 30% of the component is visible
  });

  return (
    <div className="relative bg-[#ffffff] py-16 overflow-hidden" ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2
              variants={textVariants}
              className="text-7xl font-poppins text-black mb-4"
            >
              My Strategy towards buying and selling
            </motion.h2>
            <motion.div
              variants={textVariants}
              className="text-2xl font-jakarta font-normal text-black mb-6 whitespace-pre-wrap"
            >
              {strategy}
            </motion.div>
            <motion.div variants={textVariants}>
              <CustomButton text={"Message Me"} link={'contact'} />
            </motion.div>
          </div>
          <motion.div variants={imageVariants} className="flex justify-center">
            <div className="relative border-8 border-black rounded-full p-2 overflow-hidden">
              <motion.img
                src={contactMePictureURL}
                alt="Profile Picture"
                className="w-full max-w-md rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }} // Add hover animation
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Strategy;
