import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  deleteReview,
  getAllReviews,
  toggleFeatureWithStars,
} from "../../store/reviewSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { TrashIcon, StarIcon } from "@heroicons/react/solid";
import axios from 'axios';

const AdminReviews = () => {
  const dispatch = useDispatch();
  const { reviews, error } = useSelector((state) => state.reviews);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Home Buyer");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [featureWithStars, setFeatureWithStars] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReview, setSelectedReview] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  useEffect(() => {
    if (reviews.length > 0) {
      fetchImages();
    }
  }, [reviews]);

  const fetchImages = () => {
    reviews.forEach((review, idx) => {
      fetchImage(review.picture, idx);
    });
  };

  const fetchImage = async (imagePath, idx) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${imagePath}`, {
        responseType: 'blob',
        headers: {
          "x-frontend-id": "orionship",
        }
      });
      const imageUrl = URL.createObjectURL(response.data);
      setImageURLs((prevState) => ({
        ...prevState,
        [idx]: imageUrl,
      }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const starredCount = reviews.filter(
      (review) => review.featureWithStars
    ).length;

    if (featureWithStars && starredCount >= 3) {
      setErrorMessage(
        "You already have 3 starred reviews. Please remove star from one or more reviews and try again."
      );
      setErrorModalOpen(true);
      return;
    }

    if (!picture) {
      alert("Please upload a picture.");
      return;
    }

    const reviewData = {
      quote,
      name,
      role,
      picture,
      featureWithStars,
    };

    dispatch(createReview(reviewData));
    // Reset the form fields
    setQuote("");
    setName("");
    setRole("Home Buyer");
    setPicture(null);
    setPreview(null);
    setFeatureWithStars(false);
    setErrorMessage("");
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCardClick = (review, event) => {
    if (event.target.closest(".delete-button")) {
      return;
    }
    setSelectedReview(review);
    onOpen();
  };

  const handleDelete = (id) => {
    dispatch(deleteReview(id));
  };

  const handleStarClick = (review) => {
    const starredCount = reviews.filter(
      (r) => r.featureWithStars
    ).length;

    if (!review.featureWithStars && starredCount >= 3) {
      setErrorMessage(
        "You already have 3 stars enabled. Please remove a star from another starred card and try again."
      );
      setErrorModalOpen(true);
      return;
    }

    dispatch(toggleFeatureWithStars(review._id));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Admin Reviews</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="quote"
            className="block text-sm font-medium text-gray-700"
          >
            Quote
          </label>
          <input
            type="text"
            id="quote"
            name="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="Home Buyer">Home Buyer</option>
            <option value="Home Seller">Home Seller</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="picture"
            className="block text-sm font-medium text-gray-700"
          >
            Picture
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setPicture(file);
              setPreview(URL.createObjectURL(file));
            }}
            ref={fileInputRef}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Picture Preview"
              className="mt-2 w-20 h-20 object-cover rounded-full"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Feature with stars?
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="featureWithStars"
                checked={featureWithStars}
                onChange={(e) => setFeatureWithStars(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Review
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </form>
      <h2 className="text-center text-2xl text-black mt-4 mb-4">
        You can only have 3 reviews with a star! Click on the star icon to enable or disable star status. 
      </h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {reviews.map((review, index) => (
            <div
              key={review._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white bg-opacity-50 text-white h-80 relative cursor-pointer"
              onClick={(e) => handleCardClick(review, e)}
            >
              <TrashIcon
                className="absolute top-2 right-1 text-red-500 delete-button w-6 h-6 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(review._id);
                }}
              />

              <StarIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleStarClick(review);
                }}
                className={`absolute top-2 right-10 w-6 h-6 cursor-pointer ${
                  review.featureWithStars ? "text-yellow-500" : "text-gray-500"
                } z-10`}
              />

              <div className="relative h-full">
                <img
                  className="w-full h-full object-cover"
                  src={imageURLs[index] || ""}
                  alt={review.name}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-xl mb-2">{review.name}</div>
                    <p className="text-gray-300 text-base overflow-hidden">
                      {review.quote.length > 100
                        ? review.quote.substring(0, 100) + "..."
                        : review.quote}
                    </p>
                  </div>
                  <div className="pt-4">
                    <span className="inline-block bg-gray-200 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      {review.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-500">No reviews available.</p>
      )}

      {selectedReview && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedReview.name}
                </ModalHeader>
                <ModalBody>
                  <img
                    className="w-full h-64 object-cover rounded"
                    src={imageURLs[reviews.indexOf(selectedReview)] || ""}
                    alt={selectedReview.name}
                  />
                  <p className="mt-4 text-gray-700">{selectedReview.quote}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleDelete(selectedReview._id);
                      onClose();
                    }}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {errorModalOpen && (
        <Modal isOpen={errorModalOpen} onOpenChange={setErrorModalOpen}>
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalBody>{errorMessage}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => setErrorModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default AdminReviews;
