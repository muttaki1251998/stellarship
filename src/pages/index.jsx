import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import Listing from "../components/listing-component/Listing";
import SoldListing from "../components/listing-component/SoldListing";
import Blog from "../components/Blog";
import Strategy from "../components/Strategy";
import Reviews from "@/components/Reviews";
import { setUserData } from "../store/userSlice";
import { fetchListings } from "../store/listingSlice";
import { getAllReviews, getFeaturedStarCount } from "@/store/reviewSlice";
import CustomButton from "@/components/CustomButton";

const textVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 20, duration: 3 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 20, duration: 3 },
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

const Home = ({ initialData }) => {
  const isMobile = useMediaQuery(768);
  const [loading, setLoading] = useState(true);
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [contactMePictureURL, setContactMePictureURL] = useState("");
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);
  const listings = useSelector((state) => state.listing);
  const reviews = useSelector((state) => state.reviews);
  const starCount = useSelector((state) => state.reviews.starCount);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_BACKEND_API_URL}/posts`,
        {
          headers: {
            "x-frontend-id": "orionship",
          },
        }
      );
      const data = response.data;
      dispatch(setUserData(data));

      await dispatch(fetchListings());
      await dispatch(getAllReviews());
      await dispatch(getFeaturedStarCount());

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const {
    firstName,
    lastName,
    tagline,
    profileBio,
    profileDescription,
    strategy,
    profilePicture,
    contactMePicture
  } = userData;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  const imageClass = isMobile ? "mt-32" : "";

  return (
    <div className="relative h-screen bg-[#242a2d]">
      <div className="relative w-full h-full">
        <Image
          src="/images/cover-three.jpg"
          alt="Background Image"
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-grey-400 bg-opacity-40"></div>
        <motion.div
          initial="hidden"
          animate="visible"
          className={`absolute inset-0 flex ${
            isMobile ? "flex-col" : "justify-center"
          } items-center space-x-4`}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          <motion.div
            variants={imageVariants}
            className={`relative flex justify-center items-center border-4 border-white ${imageClass}`}
            style={{
              padding: "20px",
              backgroundColor: "rgba(13, 42, 69, 0.8)",
            }}
          >
            <div className="relative bg-white">
              <Image
                src={profilePicture}
                alt="Profile Picture"
                width={isMobile ? 200 : 300}
                height={isMobile ? 200 : 300}
                className="border text-white border-gray-300 p-4 bg-white rounded-none"
              />
              <h3 className="text-center h-full text-2xl  font-caveat bg-white text-black text-xl p-4">{`${firstName} ${lastName}`}</h3>
            </div>
          </motion.div>
          <motion.div
            variants={textVariants}
            className="relative flex flex-col justify-center items-center text-center"
          >
            <div className="flex flex-col items-center text-white">
              <motion.p
                variants={textVariants}
                className="text-6xl font-serif"
                style={{ fontFamily: "Times New Roman" }}
              >
                {firstName} {lastName}
              </motion.p>
              <motion.p
                variants={textVariants}
                className="text-5xl font-serif"
                style={{ fontFamily: "Times New Roman" }}
              >
                Toronto Real Estate
              </motion.p>
              <motion.p
                variants={textVariants}
                className="text-2xl font-serif"
                style={{ fontFamily: "Times New Roman" }}
              >
                As your lifelong real estate advisor and personal market
                resource.
              </motion.p>
              <motion.div
                className="mt-8 flex space-x-4"
                variants={textVariants}
              >
                <CustomButton text="Message Me" link="contact" />
                <CustomButton text="Book a free Home Evaluation" link="eval" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Intro
        profilePicture={profilePicture}
        profileBio={profileBio}
        profileDescription={profileDescription}
      />
      <Reviews />
      <Listing listings={listings} />
      <SoldListing />
      <Strategy strategy={strategy} contactMePictureURL={contactMePicture} />
      <Blog />
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios.get(
    `${process.env.NEXT_BACKEND_API_URL}/posts`,
    {
      headers: {
        "x-frontend-id": "orionship",
      },
    }
  );
  const data = response.data;

  return { props: { initialData: data } };
}

export default Home;
