import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useSelector } from "react-redux";
import axios from 'axios';

const initialState = {
  firstName: '',
  lastName: '',
  tagline: '',
  profileBio: '',
  profilePicture: null,
  profileDescription: '',
  address: '',
  city: '',
  country: '',
  email: '',
  phone: '',
  role: '',
  intro: '',
  contactMePicture: null,
  facebookLink: '',
  instaLink: '',
  twitterLink: '',
  strategy: ''
};

const HomeComponents = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState(initialState);
  const userData = useSelector(state => state.user);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setHomeData({ ...homeData, [name]: files[0] });
      const reader = new FileReader();
      reader.onload = () => {
        if (name === "profilePicture") {
          setProfilePicturePreview(reader.result);
        } else if (name === "contactMePicture") {
          setContactMePicturePreview(reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
    } else {
      setHomeData({ ...homeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    for (const key in homeData) {
      if (homeData[key] instanceof File) {
        formDataToSend.append(key, homeData[key]);
      } else if (typeof homeData[key] === "string" && homeData[key].startsWith("uploads/")) {
        formDataToSend.append(key, homeData[key]);
      } else if (homeData[key] !== initialState[key]) {
        formDataToSend.append(key, homeData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_BACKEND_API_URL}/admin`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-frontend-id": "orionship",
          },
        }
      );

      console.log("Success:", response.data);
      onOpen();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [contactMePicturePreview, setContactMePicturePreview] = useState("");

  useEffect(() => {
    setHomeData(userData);
    if (userData.profilePicture) {
      fetchImage(userData.profilePicture, setProfilePicturePreview);
    }
    if (userData.contactMePicture) {
      fetchImage(userData.contactMePicture, setContactMePicturePreview);
    }
  }, [userData]);

  const fetchImage = async (imagePath, setPreview) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${imagePath}`, {
        responseType: 'blob',
        headers: {
          "x-frontend-id": "orionship",
        }
      });
      const imageUrl = URL.createObjectURL(response.data);
      setPreview(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-8"
      >
        <h1 className="text-2xl font-bold mb-8">Home Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-5">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={homeData.firstName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={homeData.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="mb-5">
            <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {profilePicturePreview && (
              <img src={profilePicturePreview} alt="Profile Preview" className="mt-2 h-60 border-8 border-[#1D2334] rounded-md shadow-lg" />
            )}
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="profileDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Profile Description
            </label>
            <textarea
              id="profileDescription"
              name="profileDescription"
              value={homeData.profileDescription}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-60 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              style={{ whiteSpace: 'pre-wrap' }}
            />
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="profileBio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Profile Bio
          </label>
          <input
            id="profileBio"
            name="profileBio"
            value={homeData.profileBio}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={homeData.address}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            City/Town
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={homeData.city}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={homeData.country}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={homeData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={homeData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={homeData.role}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <label htmlFor="intro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">
            A little about your professional life
          </label>
          <input
            type="text"
            id="intro"
            name="intro"
            value={homeData.intro}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="mb-5">
            <label htmlFor="contactMePicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contact Me Picture
            </label>
            <input
              type="file"
              id="contactMePicture"
              name="contactMePicture"
              accept="image/*"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {contactMePicturePreview && (
              <img src={contactMePicturePreview} alt="Contact Me Preview" className="mt-2 h-60 border-8 border-[#1D2334] rounded-md shadow-lg mb-12" />
            )}
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="facebookLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Facebook Link
            </label>
            <input
              type="url"
              id="facebookLink"
              name="facebookLink"
              value={homeData.facebookLink}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label htmlFor="instaLink" className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Instagram Link
            </label>
            <input
              type="url"
              id="instaLink"
              name="instaLink"
              value={homeData.instaLink}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label htmlFor="twitterLink" className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Twitter Link
            </label>
            <input
              type="url"
              id="twitterLink"
              name="twitterLink"
              value={homeData.twitterLink}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label htmlFor="strategy" className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Buying and Selling Strategy
            </label>
            <textarea
              id="strategy"
              name="strategy"
              value={homeData.strategy}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-32 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ whiteSpace: 'pre-wrap' }}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2.5 px-5 bg-blue-700 text-white font-medium rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Information Updated</ModalHeader>
              <ModalBody>
                <p>Your information has been updated successfully.</p>
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
    </>
  );
};

export default HomeComponents;
