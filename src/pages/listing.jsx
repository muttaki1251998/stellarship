import React from "react";
import Listing from "../components/listing-component/Listing";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
const ListingPage = () => {
  return (
    <div className="bg-gray-100 py-16">
      <Listing />
      <Footer />
    </div>
  );
};

export default ListingPage;
