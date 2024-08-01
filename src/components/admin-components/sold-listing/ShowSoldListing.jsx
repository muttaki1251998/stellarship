import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSoldListings } from '../../../store/soldListingSlice';
import EditSoldListing from './EditSoldListing';
import axios from 'axios';

const ShowSoldListing = ({ soldListings }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [editingSoldListing, setEditingSoldListing] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialImageIndex = soldListings.reduce(
      (acc, _, index) => ({
        ...acc,
        [index]: 0,
      }),
      {}
    );
    setCurrentImageIndex(initialImageIndex);
  }, [soldListings]);

  const handleNextImage = (index) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]: (prevState[index] + 1) % soldListings[index].soldListingImages.length,
    }));
  };

  const handlePrevImage = (index) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]: (prevState[index] - 1 + soldListings[index].soldListingImages.length) % soldListings[index].soldListingImages.length,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_BACKEND_API_URL}/delete-soldListing/${id}`,
        {
          headers: {
            "x-frontend-id": "orionship",
          },
        }
      );
      if (response.status === 200) {
        dispatch(fetchSoldListings());
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleEdit = (soldListing) => {
    setEditingSoldListing(soldListing);
  };

  const handleSave = (updatedListing) => {
    setEditingSoldListing(null);
    dispatch(fetchSoldListings());
  };

  const handleClose = () => {
    setEditingSoldListing(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Sold Listings</h2>
      {soldListings.map((soldListing, index) => (
        <div key={soldListing._id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="relative">
            {soldListing.soldListingImages && soldListing.soldListingImages.length > 0 ? (
              <>
                <img
                  src={soldListing.soldListingImages[currentImageIndex[index]] || ''}
                  alt={`Sold Listing Image ${index + 1}`}
                  className="w-full h-auto rounded-md mb-4"
                />
                {soldListing.soldListingImages.length > 1 && (
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
            {soldListing.streetAddress}, {soldListing.city}, {soldListing.provinceState}, {soldListing.postalCode}
          </h3>
          <p className="text-gray-700 mb-1">{soldListing.bedrooms} Bedrooms</p>
          <p className="text-gray-700 mb-1">{soldListing.bathrooms} Bathrooms</p>
          <p className="text-gray-700 mb-1">{soldListing.squareFeet} sq ft</p>
          <p className="text-gray-700 mb-1">${soldListing.price}</p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEdit(soldListing)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(soldListing._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {editingSoldListing && (
        <EditSoldListing
          soldListing={editingSoldListing}
          isOpen={Boolean(editingSoldListing)}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ShowSoldListing;
