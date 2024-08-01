import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "../../../store/listingSlice";
import EditListing from "./EditListing";
import axios from "axios";

const ShowListingsToAdmin = ({ listings }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [editingListing, setEditingListing] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialImageIndex = listings.reduce(
      (acc, _, index) => ({
        ...acc,
        [index]: 0,
      }),
      {}
    );
    setCurrentImageIndex(initialImageIndex);
  }, [listings]);

  const handleNextImage = (index) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]: (prevState[index] + 1) % listings[index].listingImages.length,
    }));
  };

  const handlePrevImage = (index) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]:
        (prevState[index] - 1 + listings[index].listingImages.length) %
        listings[index].listingImages.length,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_BACKEND_API_URL}/delete-listing/${id}`,
        {
          headers: {
            "x-frontend-id": "orionship",
          },
        }
      );
      if (response.status === 200) {
        dispatch(fetchListings());
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleEdit = (listing) => {
    setEditingListing(listing);
  };

  const handleSave = (updatedListing) => {
    setEditingListing(null);
    dispatch(fetchListings());
  };

  const handleClose = () => {
    setEditingListing(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Property Listings</h2>
      {listings.map((listing, index) => (
        <div
          key={listing._id}
          className="bg-white p-6 rounded-lg shadow-lg mb-6"
        >
          <div className="relative">
            {listing.listingImages && listing.listingImages.length > 0 ? (
              <>
                <img
                  src={listing.listingImages[currentImageIndex[index]]}
                  alt={`Listing Image ${index + 1}`}
                  className="w-full h-auto rounded-md mb-4"
                />
                {listing.listingImages.length > 1 && (
                  <>
                    <button
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                      onClick={() => handlePrevImage(index)}
                    >
                      &#9664;
                    </button>
                    <button
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                      onClick={() => handleNextImage(index)}
                    >
                      &#9654;
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2">
            {listing.streetAddress}, {listing.city}, {listing.provinceState},{" "}
            {listing.postalCode}
          </h3>
          <p className="text-gray-700 mb-1">{listing.bedrooms} Bedrooms</p>
          <p className="text-gray-700 mb-1">{listing.bathrooms} Bathrooms</p>
          <p className="text-gray-700 mb-1">{listing.squareFeet} sq ft</p>
          <p className="text-gray-700 mb-1">${listing.price}</p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEdit(listing)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(listing._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {editingListing && (
        <EditListing
          listing={editingListing}
          isOpen={Boolean(editingListing)}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ShowListingsToAdmin;
