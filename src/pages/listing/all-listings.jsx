import React from "react";
import axios from "axios";
import ListingItem from "../../components/listing-component/ListingItem";
import CustomNavbar from "../../components/CustomNavbar";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";

const AllListings = ({ listings }) => {

  const formatPrice = (price) => {
    return price % 1 === 0 ? `$${price}` : `$${price}M`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div>
      <CustomNavbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-[#ffffff] min-h-screen flex flex-col mb-12"
      >
        <div className="container mx-auto max-w-7xl px-4 flex-grow">
          <h1 className="text-center text-black font-poppins text-7xl mb-12 mt-32">
            My Exclusive Listings
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
            {listings.map((listing) => (
              <ListingItem
                key={listing._id}
                listing={listing}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_BACKEND_API_URL}/listings`, {
        headers: {
          "x-frontend-id": "orionship",
        }
      }
    );
    return {
      props: { listings: response.data },
    };
  } catch (error) {
    console.error("Error fetching listings:", error);
    return {
      props: { listings: [] },
    };
  }
}

export default AllListings;
