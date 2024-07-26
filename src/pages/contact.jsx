import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ContactPage = () => {
  const userData = useSelector((state) => state.user);
  const { firstName, lastName, contactMePicture, email: userEmail } = userData;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (contactMePicture) {
      const fetchImage = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${contactMePicture}`, {
            responseType: 'blob',
            headers: {
              "x-frontend-id": "orionship",
            }
          });
          const imageUrl = URL.createObjectURL(response.data);
          setImageURL(imageUrl);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
      fetchImage();
    }
  }, [contactMePicture]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_BACKEND_API_URL}/send-contact-email`,
        { ...formData, userEmail: "muttaki4989@gmail.com" },
        {
          headers: {
            "x-frontend-id": "orionship",
          },
        }
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      onOpen(); // Show the modal on successful email send
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email");
    }
  };

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#ffffff]">
      <div className="flex flex-grow mt-36">
        <div className="relative hidden md:flex w-1/2 h-full items-center justify-center p-8">
          <motion.div
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={formVariants}
          >
            <div className="border text-black border-gray-300 p-4 w-full max-w-xl bg-white rounded-none">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src="/images/buying.jpg"
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-contain"
                />
              )}
              <h3 className="text-center text-black text-xl mt-4">{`${firstName} ${lastName}`}</h3>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="relative w-full md:w-1/2 h-full p-12 flex flex-col justify-center"
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          variants={formVariants}
          ref={formRef}
        >
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
            <Link href="/" legacyBehavior>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </button>
          <div className="max-w-lg mx-auto">
            <h2 className="text-5xl text-black mb-4">Here To Help</h2>
            <p className="text-black text-xl mb-4">
              Buying, selling, or just curious on how or when to get started?
              Use the form below to sign up for my monthly market updates or to
              schedule time to chat about real estate in the Bay Area. I look
              forward to hearing from you.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  className="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="firstName"
                  className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  First Name (required)
                </label>
              </div>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  className="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label
                  htmlFor="lastName"
                  className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Last Name
                </label>
              </div>
              <div className="relative mb-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email (required)
                </label>
              </div>
              <div className="relative mb-6">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  className="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  rows="4"
                  placeholder=" "
                  onChange={handleChange}
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Have another question? How can I help?
                </label>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 border border-white text-black focus:outline-none bg-transparent transition-all duration-500 ease-out hover:bg-[#black] hover:text-black"
              >
                <span>Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Message Sent
              </ModalHeader>
              <ModalBody>
                <p>
                  Your message has been sent successfully. {firstName} will get
                  back to you soon.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Footer />
    </div>
  );
};

export default ContactPage;
