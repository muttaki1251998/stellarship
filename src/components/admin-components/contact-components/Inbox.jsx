import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inbox = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Oldest First');

  useEffect(() => {
    // Mock contacts data
    const mockContacts = [
      {
        _id: '1',
        fullname: 'Emily Myers',
        email: 'emily@example.com',
        phone: '+1 555-1234',
        createdAt: '2024-07-10',
        type: 'Emails',
        message: 'Leads DC Area Hey Nick, Yes that is correct. Can you look back on the history to see which leads were Washington D.C. and then update?'
      },
      {
        _id: '2',
        fullname: 'Jake Huffman',
        email: 'jake@example.com',
        phone: '+1 555-5678',
        createdAt: '2024-07-09',
        type: 'Emails',
        message: 'Received SMS (Primary Number) Got the green light from Derick.'
      },
      {
        _id: '3',
        fullname: 'Matt Bradley',
        email: 'matt@example.com',
        phone: '+1 555-8765',
        createdAt: '2024-07-08',
        type: 'Emails',
        message: 'CSV mapping question On my CSV sheet the lead has a column for the lead first last and full name. Should I map the column titled "first name" to both?'
      },
      {
        _id: '4',
        fullname: 'Taylor Higgs',
        email: 'taylor@example.com',
        phone: '+1 555-4321',
        createdAt: '2024-07-07',
        type: 'Emails',
        message: 'Received SMS (Primary Number) Excellent. Appreciate the quick response on this!'
      },
    ];

    setContacts(mockContacts);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredContacts = contacts.filter(contact => filter === 'All' || contact.type === filter);
  const sortedContacts = filteredContacts.sort((a, b) => {
    if (sortBy === 'Oldest First') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Inbox</h1>
        <span className="text-gray-600">{contacts.length} items</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className={`px-4 py-2 ${filter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleFilterChange('All')}>All</button>
          <button className={`px-4 py-2 ${filter === 'Emails' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleFilterChange('Emails')}>Emails</button>
          <button className={`px-4 py-2 ${filter === 'Calls' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleFilterChange('Calls')}>Calls</button>
          <button className={`px-4 py-2 ${filter === 'SMS' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleFilterChange('SMS')}>SMS</button>
          <button className={`px-4 py-2 ${filter === 'Tasks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleFilterChange('Tasks')}>Tasks</button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Sort by:</span>
          <select value={sortBy} onChange={handleSortChange} className="p-2 border border-gray-300 rounded">
            <option value="Oldest First">Oldest First</option>
            <option value="Newest First">Newest First</option>
          </select>
        </div>
      </div>
      <table className="min-w-full">
        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact._id}>
              <td className="py-2 px-4 border-b">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 border-b">
                <div>
                  <strong>{contact.fullname}</strong>
                  <p>{contact.email}</p>
                  <p>{contact.phone}</p>
                  <p className="text-gray-600">{contact.message}</p>
                </div>
              </td>
              <td className="py-2 px-4 border-b">{new Date(contact.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inbox;
