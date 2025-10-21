import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Single contact row
const ContactRow = ({ contact, onDelete, onEdit }) => (
  <tr className="divide-x divide-gray-200">
    <td className="px-6 py-4 whitespace-nowrap">{contact.firstName}</td>
    <td className="px-6 py-4 whitespace-nowrap">{contact.lastName}</td>
    <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
    <td className="px-6 py-4 whitespace-nowrap">{contact.groupName}</td>
    <td className="px-6 py-4 whitespace-nowrap">{contact.updatedOn}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        onClick={onEdit}
        className="text-indigo-600 hover:text-indigo-900 mr-4"
        aria-label="Edit contact"
      >
        <i className="fas fa-edit"></i>
      </button>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-900"
        aria-label="Delete contact"
      >
        <i className="fas fa-trash"></i>
      </button>
    </td>
  </tr>
);

// Add new contact form
const AddContactForm = ({ onSave, onCancel }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    groupName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.groupName) {
      alert('All fields are required.');
      return;
    }
    onSave(contact);
    setContact({ firstName: '', lastName: '', email: '', groupName: '' });
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 animate-fade-in-down">
      <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name*</label>
            <input
              type="text"
              name="firstName"
              value={contact.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={contact.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email*</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Group Name*</label>
            <input
              type="text"
              name="groupName"
              value={contact.groupName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Component
const MyContacts = () => {
  const initialContacts = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      groupName: 'Linkedin',
      updatedOn: '2023-10-26',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      groupName: 'Gmail',
      updatedOn: '2023-10-25',
    },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [showForm, setShowForm] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : '');
  };

  const handleSaveContact = (newContact) => {
    const updatedContact = {
      ...newContact,
      id: Date.now(),
      updatedOn: new Date().toISOString().split('T')[0],
    };
    setContacts((prev) => [updatedContact, ...prev]);
    setShowForm(false);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleEditContact = (id) => {
    alert(`Editing contact ID: ${id}`);
  };
      const [contactss, setContactss] = useState([]);
  const [error, setError] = useState("");
  
  const fetchContacts = async () => {
    const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/view-introduction-email-list`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setContactss(response.data.template.data);
    } catch (error) {
      setError("Failed to fetch contacts.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Contacts</h1>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <i className="fas fa-download mr-2"></i>Download Template
            </button>
            <div className="relative">
              <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
              <label
                htmlFor="file-upload"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              >
                <i className={`fas ${fileName ? 'fa-check-circle' : 'fa-upload'} mr-2`}></i>
                {fileName || 'Choose File'}
              </label>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <i className="fas fa-file-import mr-2"></i>Import
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ml-auto"
            >
              <i className={`fas ${showForm ? 'fa-minus-circle' : 'fa-plus-circle'} mr-2`}></i>
              {showForm ? 'Hide Form' : 'Add Contact'}
            </button>
          </div>
        </header>

        {showForm && <AddContactForm onSave={handleSaveContact} onCancel={() => setShowForm(false)} />}

        <main className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['First Name', 'Last Name', 'Email', 'Group Name', 'Updated On', 'Action'].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contactss.length > 0 ? (
                contactss.map((contact) => (
                  <tr key={contact.id}>
                            <td style={{ fontSize: "15px" }}>{contact.first_name}</td>
                            <td style={{ fontSize: "15px" }}>{contact.last_name}</td>
                            <td style={{ fontSize: "15px" }}>{contact.group_name}</td>
                            <td style={{ fontSize: "15px" }}>{contact.email}</td>
                            <td style={{ fontSize: "15px" }}>
                              {new Date(contact.created_at).toISOString().split("T")[0]}
                            </td>

                            
                          </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No contacts found. Add one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default MyContacts;
