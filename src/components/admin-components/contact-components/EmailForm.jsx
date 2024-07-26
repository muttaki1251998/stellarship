import React, { useState } from 'react';

const EmailForm = ({ contactEmail, onClose }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendEmail = (e) => {
    e.preventDefault();
    // Add your email sending logic here
    console.log(`Sending email to: ${contactEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    onClose();
  };

  return (
    <form onSubmit={handleSendEmail} className="mt-2 p-4 bg-gray-100 rounded shadow">
      <div className="mb-2">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          rows="4"
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="mr-2 text-gray-600">Cancel</button>
        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">Send</button>
      </div>
    </form>
  );
};

export default EmailForm;
