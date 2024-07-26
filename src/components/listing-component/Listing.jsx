import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import ListingItem from "./ListingItem";
import { useSelector } from 'react-redux';
import CustomButton from "../CustomButton";

const Listing = () => {
  const formatPrice = (price) => {
    return price % 1 === 0 ? `$${price}` : `$${price}M`;
  };

  const listings = useSelector(state => state.listing).slice(0, 4);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 1 },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  return (
    <div className="bg-[#ffffff] py-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative mb-6 flex">
          <motion.h1
            className="font-poppins text-black text-7xl relative z-10 px-2"
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
          >
            My Exclusive
            <br /> Property Listing
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {listings.map((listing, listingIndex) => (
            <motion.div
              key={listing._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: listingIndex * 0.2 }}
            >
              <ListingItem
                listing={listing}
                formatPrice={formatPrice}
                isSoldListing={false}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
       <CustomButton text={"View All"} link={'listing/all-listings'} />
        </div>
      </div>
    </div>
  );
};

export default Listing;
