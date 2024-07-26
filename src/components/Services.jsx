import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import ButtonIcon from "./IconComponents/ButtonIcon";

const serviceVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: "50%", transition: { duration: 2, ease: "easeInOut" } },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 3, delay: 0.5 } },
};



const Services = () => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [lineRef, lineInView] = useInView({ triggerOnce: false });
  const [buyingRef, buyingInView] = useInView({ triggerOnce: true });
  const [sellingRef, sellingInView] = useInView({ triggerOnce: true });
  const [consultationRef, consultationInView] = useInView({
    triggerOnce: true,
  });

  return (
    <div className="py-16 bg-[#e0f4fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12 flex items-center justify-center">
          <motion.div
            ref={lineRef}
            initial="hidden"
            animate={lineInView ? "visible" : "hidden"}
            variants={lineVariants}
            className="absolute h-0.5 w-full max-w-7xl"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              right: "50%",
              background:
                "linear-gradient(to left, rgba(135, 165, 176, 0), #009dd6)",
            }}
          />
          <motion.h2
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={textVariants}
            className="text-center text-3xl font-poppins text-gray-900 relative z-10 px-2 bg-[#e0f4fc]"
          >
            Services Offered
          </motion.h2>
          <motion.div
            ref={lineRef}
            initial="hidden"
            animate={lineInView ? "visible" : "hidden"}
            variants={lineVariants}
            className="absolute h-0.5 w-full max-w-7xl"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              left: "50%",
              background:
                "linear-gradient(to right, rgba(135, 165, 176, 0), #009dd6)",
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Buying Service */}
          <motion.div
            ref={buyingRef}
            initial="hidden"
            animate={buyingInView ? "visible" : "hidden"}
            variants={serviceVariants}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <img
              src="/images/buying.jpg"
              alt="Buying"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Buying</h3>
            <p className="text-gray-700 mb-4">
              Learn how the right strategy will help you win your next home.
            </p>
            <ButtonIcon
              text={"Book Appointment"}
              width={60}
              height={60}
              initialColor={"transparent"}
              hoverColor={"#84a6b4"}
              textColor={"gray-900"}
              hoverTextColor={"white"}
              linkHref={"/contact"}
            />
          </motion.div>
          {/* Selling Service */}
          <motion.div
            ref={sellingRef}
            initial="hidden"
            animate={sellingInView ? "visible" : "hidden"}
            variants={serviceVariants}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <img
              src="/images/selling.jpg"
              alt="Selling"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Selling</h3>
            <p className="text-gray-700 mb-4">
              Rely on a trusted advisor to sell your home quicker for more
              money.
            </p>
            <ButtonIcon
              text={"Book Appointment"}
              width={60}
              height={60}
              initialColor={"transparent"}
              hoverColor={"#84a6b4"}
              textColor={"gray-900"}
              hoverTextColor={"white"}
              linkHref={"/contact"}
            />
          </motion.div>
          {/* Consultation Service */}
          <motion.div
            ref={consultationRef}
            initial="hidden"
            animate={consultationInView ? "visible" : "hidden"}
            variants={serviceVariants}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <img
              src="/images/consult.jpg"
              alt="Consultation"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Consultation</h3>
            <p className="text-gray-700 mb-4">
              Get expert advice tailored to your unique real estate needs.
            </p>
            <ButtonIcon
              text={"Book Appointment"}
              width={60}
              height={60}
              initialColor={"transparent"}
              hoverColor={"#84a6b4"}
              textColor={"gray-900"}
              hoverTextColor={"white"}
              linkHref={"/contact"}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
