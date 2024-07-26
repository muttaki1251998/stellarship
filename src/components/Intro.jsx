import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SpinnerIcon from "./IconComponents/SpinnerIcon";
import CustomButton from "./CustomButton";
import { useSelector } from 'react-redux';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24, duration: 1.5 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24, duration: 1.5 },
  },
};

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const updateTarget = (e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    };

    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [width]);

  return targetReached;
};

const Intro = ({ profilePicture, profileBio, profileDescription }) => {
  const userData = useSelector(state => state.user);
  const { firstName, lastName } = userData;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="relative bg-[ffffff] py-16 overflow-hidden" ref={ref}>
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
              className="text-3xl font-poppins text-black mb-4"
            >
              <div className="flex items-center justify-center mb-4">
                <SpinnerIcon width="100" height="100" arrowColor="black" textColor="black" />
                <h1 className="text-4xl font-nanum text-black font-bold ml-4">
                  {firstName} {lastName}
                </h1>
              </div>
              {profileBio}
            </motion.h2>
            <motion.p
              variants={textVariants}
              className="text-xl font-jakarta font-normal text-black mb-6 leading-relaxed"
            >
              {profileDescription}
            </motion.p>
            <motion.div variants={textVariants}>
              <CustomButton text={"Message Me"} link={'contact'} />
            </motion.div>
          </div>
          <motion.div variants={imageVariants} className="flex justify-center">
            <img
              src={profilePicture}
              alt="Profile Picture"
              className="w-96 max-w-md rounded-none border-8 border-solid border-black shadow-3xl transform transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
