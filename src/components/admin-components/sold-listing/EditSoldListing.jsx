import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import axios from "axios";

const provinces = [
  "Ontario",
  "Quebec",
  "Nova Scotia",
  "New Brunswick",
  "Manitoba",
  "British Columbia",
  "Prince Edward Island",
  "Saskatchewan",
  "Alberta",
  "Newfoundland and Labrador",
];

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const EditSoldList = ({ soldListing, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(soldListing);
  const [newImages, setNewImages] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setFormData(soldListing);
    setNewImages([]);
    setIsChanged(false);
  }, [soldListing]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: newValue };
      setIsChanged(
        JSON.stringify(updatedFormData) !== JSON.stringify(soldListing) ||
          newImages.length > 0
      );
      return updatedFormData;
    });
  };

  const handleNewImages = (e) => {
    setNewImages([...newImages, ...Array.from(e.target.files)]);
    setIsChanged(true);
  };

  const handleDeleteImage = async (image, index) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_BACKEND_API_URL}/delete-soldListing-image/${soldListing._id}/${encodeURIComponent(image)}`,
        {
          headers: {
            "x-frontend-id": "orionship",
          },
        }
      );
      if (response.status === 200) {
        setFormData((prevState) => ({
          ...prevState,
          soldListingImages: prevState.soldListingImages.filter(
            (img) => img !== image
          ),
        }));
        setIsChanged(true);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    newImages.forEach((file) => {
      formDataToSend.append("soldListingImages", file);
    });

    try {
      const response = await axios.put(
        `${process.env.NEXT_BACKEND_API_URL}/edit-soldListing/${formData._id}`,
        formDataToSend,
        {
          headers: {
            "x-frontend-id": "orionship",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      onSave(response.data.soldListing);
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader>Edit Listing</ModalHeader>
        <ModalBody>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Canada">Canada</option>
              <option value="USA">USA</option>
            </select>
          </div>
          {formData.country === "Canada" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Province
              </label>
              <select
                name="provinceState"
                value={formData.provinceState}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                name="provinceState"
                value={formData.provinceState}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Square Feet
            </label>
            <input
              type="number"
              name="squareFeet"
              value={formData.squareFeet}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Listing Images
            </label>
            <input
              type="file"
              name="soldListingImages"
              accept="image/*"
              multiple
              onChange={handleNewImages}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {formData.soldListingImages.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Sold Listing Image ${index + 1}`}
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    onClick={() => handleDeleteImage(url, index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {newImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New Image ${index + 1}`}
                    className="w-full h-auto rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleSave} disabled={!isChanged}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditSoldList;
