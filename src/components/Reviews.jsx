"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/motion-components/CustomModal";
import { cn } from "@/lib/utils";

const Reviews = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const items = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    addAnimation();
  }, [items]);

  const [start, setStart] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      );
    }
  };

  const renderStars = () => (
    <div className="flex justify-center mb-4">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-yellow-500"
        >
          <path d="M9.049 2.927C9.451 2.084 10.549 2.084 10.951 2.927L12.339 5.719C12.46 5.98 12.719 6.178 13.019 6.233L15.995 6.769C16.899 6.936 17.274 8.052 16.624 8.719L14.501 10.897C14.31 11.089 14.218 11.363 14.252 11.638L14.707 14.598C14.843 15.486 13.912 16.129 13.105 15.746L10.5 14.481C10.192 14.324 9.808 14.324 9.5 14.481L6.895 15.746C6.088 16.129 5.157 15.486 5.293 14.598L5.748 11.638C5.782 11.363 5.69 11.089 5.499 10.897L3.376 8.719C2.726 8.052 3.101 6.936 4.005 6.769L6.981 6.233C7.281 6.178 7.54 5.98 7.661 5.719L9.049 2.927Z" />
        </svg>
      ))}
    </div>
  );

  const animateStars = () => (
    <div className="relative flex justify-center items-center w-full h-full">
      <div className="absolute star-1" style={{ top: "10%", left: "10%" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-20 h-20 text-yellow-500"
        >
          <path d="M9.049 2.927C9.451 2.084 10.549 2.084 10.951 2.927L12.339 5.719C12.46 5.98 12.719 6.178 13.019 6.233L15.995 6.769C16.899 6.936 17.274 8.052 16.624 8.719L14.501 10.897C14.31 11.089 14.218 11.363 14.252 11.638L14.707 14.598C14.843 15.486 13.912 16.129 13.105 15.746L10.5 14.481C10.192 14.324 9.808 14.324 9.5 14.481L6.895 15.746C6.088 16.129 5.157 15.486 5.293 14.598L5.748 11.638C5.782 11.363 5.69 11.089 5.499 10.897L3.376 8.719C2.726 8.052 3.101 6.936 4.005 6.769L6.981 6.233C7.281 6.178 7.54 5.98 7.661 5.719L9.049 2.927Z" />
        </svg>
      </div>
      <div className="absolute star-2" style={{ top: "30%", left: "50%" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-20 h-20 text-yellow-500"
        >
          <path d="M9.049 2.927C9.451 2.084 10.549 2.084 10.951 2.927L12.339 5.719C12.46 5.98 12.719 6.178 13.019 6.233L15.995 6.769C16.899 6.936 17.274 8.052 16.624 8.719L14.501 10.897C14.31 11.089 14.218 11.363 14.252 11.638L14.707 14.598C14.843 15.486 13.912 16.129 13.105 15.746L10.5 14.481C10.192 14.324 9.808 14.324 9.5 14.481L6.895 15.746C6.088 16.129 5.157 15.486 5.293 14.598L5.748 11.638C5.782 11.363 5.69 11.089 5.499 10.897L3.376 8.719C2.726 8.052 3.101 6.936 4.005 6.769L6.981 6.233C7.281 6.178 7.54 5.98 7.661 5.719L9.049 2.927Z" />
        </svg>
      </div>
      <div className="absolute star-3" style={{ top: "70%", left: "30%" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-20 h-20 text-yellow-500"
        >
          <path d="M9.049 2.927C9.451 2.084 10.549 2.084 10.951 2.927L12.339 5.719C12.46 5.98 12.719 6.178 13.019 6.233L15.995 6.769C16.899 6.936 17.274 8.052 16.624 8.719L14.501 10.897C14.31 11.089 14.218 11.363 14.252 11.638L14.707 14.598C14.843 15.486 13.912 16.129 13.105 15.746L10.5 14.481C10.192 14.324 9.808 14.324 9.5 14.481L6.895 15.746C6.088 16.129 5.157 15.486 5.293 14.598L5.748 11.638C5.782 11.363 5.69 11.089 5.499 10.897L3.376 8.719C2.726 8.052 3.101 6.936 4.005 6.769L6.981 6.233C7.281 6.178 7.54 5.98 7.661 5.719L9.049 2.927Z" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="relative bg-[#ffffff] z-20 w-full overflow-hidden py-16">
      {/* Static reviews section */}
      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Left side: Success Stories */}
        <div className="md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start relative">
          <h3 className="text-7xl text-black">Success Stories</h3>
          <p className="mt-4 text-lg text-black">
            Discover why Toronto’s busy professionals and top-performers trust
            and recommend me.
          </p>
          <div className="mt-16 flex justify-center w-full h-32 relative">
            {animateStars()}
          </div>
          <p className="mt-12 text-2xl font-jakarta font-normal text-black mb-6 leading-relaxed">
            I always put my clients' interests first. I take the time to
            understand your unique needs and preferences, ensuring that every
            property I present aligns with your goals and aspirations.
            Transparency and honesty are my guiding principles, and I provide
            you with all the necessary information to make informed decisions. I
            negotiate tirelessly on your behalf, securing the best possible
            deals and terms.
          </p>
        </div>

        {/* Right side: Top reviews */}
        <div className="md:w-1/2 space-y-8">
          {Array.isArray(items) &&
            items
              .filter((item) => item.featureWithStars)
              .slice(0, 3)
              .map((item, idx) => (
                <Modal key={idx}>
                  <ModalTrigger>
                    <div
                      className="relative p-6 rounded-lg group flex items-center cursor-pointer"
                      onClick={() => setSelectedReview(item)}
                    >
                      <div className="flex-grow w-full md:w-3/5 md:text-left text-center">
                        {renderStars()}
                        <blockquote className="text-black text-lg font-normal mb-4 line-clamp-3">
                          “{item.quote}”
                        </blockquote>
                        <cite className="text-black text-sm not-italic">
                          {item.name}
                        </cite>
                      </div>
                      <div className="w-2/5 h-full flex justify-center items-center hidden md:block">
                        <div className="absolute top-0 bottom-0 right-0 w-0 md:group-hover:w-64 transition-all duration-300 ease-in-out overflow-hidden">
                          <img
                            src={item.picture}
                            alt="Thumbnail"
                            className="h-full w-md rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </ModalTrigger>

                  {selectedReview && (
                    <ModalBody>
                      <ModalContent className="bg-[#242B2D] text-white">
                        <h3 className="text-2xl mb-4">{selectedReview.name}</h3>
                        <p className="text-lg mb-4">{selectedReview.quote}</p>
                        <div className="flex justify-center">
                          <img
                            src={selectedReview.picture}
                            alt="Full size"
                            className="border-2 border-white rounded-lg"
                          />
                        </div>
                      </ModalContent>
                    </ModalBody>
                  )}
                </Modal>
              ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Reviews;
