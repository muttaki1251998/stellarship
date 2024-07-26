import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import ListingItem from "./ListingItem";
import { fetchSoldListings } from "../../store/soldListingSlice";
import CustomButton from "../CustomButton";
import { Spinner } from "@nextui-org/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SoldListing = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSoldListings()).then(() => setLoading(false));
  }, [dispatch]);

  const listings = useSelector(state => state.soldListing).slice(0, 4);

  const formatPrice = (price) => {
    return price % 1 === 0 ? `$${price}` : `$${price}M`;
  };

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
    threshold: 0.1,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

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
            Properties Sold
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {listings && listings.map((listing, listingIndex) => (
            <motion.div
              key={listing._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: listingIndex * 0.2 }}
            >
              <ListingItem listing={listing} formatPrice={formatPrice} isSoldListing={true} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <CustomButton text="View All" link={'listing/all-sold-listings'} />
        </div>
      </div>
    </div>
  );
};

export default SoldListing;
