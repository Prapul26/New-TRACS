import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Icon = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    'credit-card': <><path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z" /><path d="M2 14h20" /></>,
    'user': <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    'lock': <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    'link': <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" /></>,
    'inbox': <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>,
    'users': <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    'mail': <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
    'pen-square': <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    'help-circle': <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>,
    'thumbs-up': <><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.01.27Z" /></>,
    'message-square': <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    'book-open': <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
    'menu': <><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></>,
    'chevron-down': <path d="m6 9 6 6 6-6" />,
    'x': <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
    'plus': <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

const SidebarLink = ({ icon, text, to = "#", active = false }) => (
    <Link
        to={to}
        className={`flex items-center px-6 py-3 mt-2 ${active ? 'text-white bg-gray-700' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
    >
        <Icon name={icon} className="w-6 h-6" />
        <span className="ml-3">{text}</span>
    </Link>
);

const SidebarSection = ({ title, links }) => (
  <div className="mt-8">
    <span className="text-xs font-semibold text-gray-500 uppercase px-6">{title}</span>
    {links.map(link => <SidebarLink key={link.text} {...link} />)}
  </div>
);

const Sidebar = () => {
  const sections = [
    {
      title: 'Account Settings',
      links: [
        { icon: 'credit-card', text: 'My Membership', to: '/myMembership' },
        { icon: 'user', text: 'My Profile', to: '/myProfile' },
        { icon: 'lock', text: 'Change Password', to: '/changePassword'  },
        { icon: 'link', text: 'Affiliation' },
      ],
    },
    {
      title: 'Introductions',
      links: [
        { icon: 'inbox', text: 'Introduction Messages', to: '/' },
        { icon: 'users', text: 'My Contacts', active: true },
        { icon: 'mail', text: 'Email Templates' , to: '/emailTemplate'},
        { icon: 'pen-square', text: 'Email Signature' , to: '/emailSignature' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { icon: 'help-circle', text: 'App Help' },
        { icon: 'thumbs-up', text: 'Feedback' },
        { icon: 'message-square', text: 'Contact Us' },
        { icon: 'book-open', text: 'Networking 101' },
      ],
    },
  ];

  return (
    <aside className="bg-[#1a202c] w-64 flex-shrink-0 hidden lg:block">
      <div className="p-6">
        <a href="#" className="text-white text-2xl font-bold">TRACS</a>
      </div>
      <nav className="mt-6">
        {sections.map(section => <SidebarSection key={section.title} {...section} />)}
      </nav>
    </aside>
  );
};





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

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, groupName } = contact;

    if (!firstName || !lastName || !email || !groupName) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

      const response = await axios.post(
        `https://tracsdev.apttechsol.com/api/contact_store_form`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          group_name: groupName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setMessage("Contact added successfully!");
      setContact({ firstName: "", lastName: "", email: "", groupName: "" });
      window.location.reload()
      // Notify parent component if needed


    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding the contact.");
    } finally {
      setLoading(false);
    }
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
        `https://tracsdev.apttechsol.com/api/view-introduction-email-list`,
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
    <div style={{ display: "flex" }}><div>   <Sidebar /></div>
      <div className="bg-gray-100 text-gray-800 min-h-screen font-sans" style={{ width: "100%" }}>

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
                    <tr key={contact.id} className="divide-x divide-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap">{contact.first_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{contact.last_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{contact.group_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
      </div></div>
  );
};

export default MyContacts;
