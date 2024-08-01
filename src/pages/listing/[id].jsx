import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import CustomNavbar from "../../components/CustomNavbar";
import BedSingleIcon from "../../components/IconComponents/BedSingleIcon";
import BathIcon from "../../components/IconComponents/BathIcon";
import SizeIcon from "../../components/IconComponents/SizeIcon";
import Footer from "../../components/Footer";

const ListingDetails = ({ listing, isSoldListing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [geocodeError, setGeocodeError] = useState(null);

  const images = listing.listingImages || listing.soldListingImages || [];

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: `${listing.streetAddress}, ${listing.city}, ${listing.provinceState}, ${listing.postalCode}`,
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            },
          }
        );
        if (response.data.results && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        } else {
          setGeocodeError("No results found for the provided address.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setGeocodeError("Unable to fetch coordinates for the address.");
      }
    };

    if (listing) {
      fetchCoordinates();
    }
  }, [listing]);

  if (!listing) return <div>Loading...</div>;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full min-h-screen bg-[#ffffff] flex flex-col items-center pt-24"
      >
        <div className="container flex flex-col items-center w-full max-w-5xl px-4 space-y-8 mt-16">
          {/* Image Section */}
          <div className="relative w-full max-w-4xl">
            <div className="relative w-full h-96">
              <AnimatePresence initial={false}>
                {images.map(
                  (image, index) =>
                    index === currentImageIndex && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full h-full flex justify-center items-center"
                      >
                        <img
                          src={image}
                          alt={`Listing Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                      </motion.div>
                    )
                )}
              </AnimatePresence>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  fill="none"
                >
                  <path
                    d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  fill="none"
                >
                  <path
                    d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 cursor-pointer border-2 ${
                    currentImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  } rounded-lg overflow-hidden`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Listing Details */}
          <div className="w-full bg-[#84a6b4] text-white p-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center mb-4">
              <div className="mr-4 p-4 bg-white text-black font-bold rounded-lg mb-4 md:mb-0">
                {isSoldListing ? "SOLD" : "FOR SALE"}
              </div>
              <div>
                <h1 className="font-poppins text-3xl">
                  {listing.streetAddress}
                </h1>
                <p className="text-lg">
                  {listing.city}, {listing.provinceState}, {listing.postalCode}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-evenly">
              <div className="flex items-center">
                <BedSingleIcon
                  width="48"
                  height="48"
                  color="black"
                  className="text-black-400 mr-2"
                />
                <span className="ml-2 text-black">{listing.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <BathIcon
                  width="48"
                  height="48"
                  color="black"
                  className="text-black-400 mr-2"
                />
                <span className="ml-2 text-black">{listing.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <SizeIcon
                  width="48"
                  height="48"
                  color="black"
                  className="text-black-400 mr-2"
                />
                <span className="ml-2 text-black">
                  {listing.squareFeet} ft<sup>2</sup>
                </span>
              </div>
              <div className="text-black text-2xl">
                {formatPrice(listing.price)}
              </div>
            </div>
          </div>

          {/* Google Map */}
          {coordinates.lat && coordinates.lng ? (
            <div className="w-full max-w-5xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  center={coordinates}
                  zoom={15}
                >
                  <Marker position={coordinates} />
                </GoogleMap>
              </LoadScript>
            </div>
          ) : (
            <p className="text-red-500 mt-4">{geocodeError}</p>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

const formatPrice = (price) => {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

// This function gets called on every request
export async function getServerSideProps(context) {
  const { id, type } = context.query;

  try {
    const endpoint =
      type === "sold"
        ? `${process.env.NEXT_BACKEND_API_URL}/soldListing/${id}`
        : `${process.env.NEXT_BACKEND_API_URL}/listing/${id}`;
    const response = await axios.get(endpoint, {
      headers: {
        "x-frontend-id": "orionship",
      },
    });
    const listing = response.data;

    return {
      props: {
        listing,
        isSoldListing: type === "sold",
      },
    };
  } catch (error) {
    console.error("Error fetching listing:", error);

    return {
      props: { listing: null, isSoldListing: false },
    };
  }
}

export default ListingDetails;
