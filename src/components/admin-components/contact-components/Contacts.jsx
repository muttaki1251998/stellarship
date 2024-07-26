import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MailIcon, PhoneIcon } from '@heroicons/react/outline';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import ContactForm from './ContactForm';
import EmailForm from './EmailForm';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [emailFormIndex, setEmailFormIndex] = useState(null); // Track the index of the contact for which the email form is shown
  const [contactDetailsIndex, setContactDetailsIndex] = useState(null); // Track the index of the contact for which details are shown
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Fetch contacts from the backend server
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts`, {
          headers: {
            "x-frontend-id": "orionship",
          }
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts`, {
        fullname,
        email,
        phone,
        address,
      }, {
        headers: {
          "x-frontend-id": "orionship",
        }
      });
      setStatus('Contact created successfully!');
      setContacts([...contacts, response.data]);
      setFullname('');
      setEmail('');
      setPhone('');
      setAddress('');
      onClose();
    } catch (error) {
      console.error('Error creating contact:', error);
      setStatus('Error creating contact.');
    }
  };

  const handleEmailIconClick = (index) => {
    if (emailFormIndex === index) {
      setEmailFormIndex(null);
    } else {
      setEmailFormIndex(index);
    }
  };

  const handleNameClick = (index) => {
    if (contactDetailsIndex === index) {
      setContactDetailsIndex(null);
    } else {
      setContactDetailsIndex(index);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <span className="text-gray-600">{contacts.length} Total Results</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Add Filter</button>
        <div className="flex items-center space-x-2">
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Call</button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Email</button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded" onClick={onOpen}>Add Contact</button>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">
              <input type="checkbox" />
            </th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b"></th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Lead</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <React.Fragment key={contact._id}>
              <tr>
                <td className="py-2 px-4 border-b">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-4 border-b">
                  <a href="#" className="text-blue-600 cursor-pointer" onClick={() => handleNameClick(index)}>{contact.fullname}</a>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <MailIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => handleEmailIconClick(index)} />
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{contact.title}</td>
                <td className="py-2 px-4 border-b">{contact.lead}</td>
              </tr>
              {emailFormIndex === index && (
                <tr>
                  <td colSpan="5" className="px-4 py-2">
                    <EmailForm contactEmail={contact.email} onClose={() => setEmailFormIndex(null)} />
                  </td>
                </tr>
              )}
              {contactDetailsIndex === index && (
                <tr>
                  <td colSpan="5" className="px-4 py-2 bg-gray-100">
                    <div>
                      <p><strong>Full Name:</strong> {contact.fullname}</p>
                      <p><strong>Email:</strong> {contact.email}</p>
                      <p><strong>Phone:</strong> {contact.phone}</p>
                      <p><strong>Address:</strong> {contact.address}</p>
                      <p><strong>Title:</strong> {contact.title}</p>
                      <p><strong>Lead:</strong> {contact.lead}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Contact</ModalHeader>
              <ModalBody>
                <ContactForm
                  fullname={fullname}
                  setFullname={setFullname}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  address={address}
                  setAddress={setAddress}
                  handleSubmit={handleSubmit}
                  status={status}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Contacts;
