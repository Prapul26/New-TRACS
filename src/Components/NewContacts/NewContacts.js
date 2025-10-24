import React, { useState } from 'react';

// This component represents a single contact row in the table.
const ContactRow = ({ contact, onDelete, onEdit }) => (
    <tr className="divide-x divide-gray-200">
        <td className="px-6 py-4 whitespace-nowrap">{contact.firstName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{contact.lastName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{contact.groupName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{contact.updatedOn}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button onClick={onEdit} className="text-indigo-600 hover:text-indigo-900 mr-4" aria-label="Edit contact">
                <i className="fas fa-edit"></i>
            </button>
            <button onClick={onDelete} className="text-red-600 hover:text-red-900" aria-label="Delete contact">
                <i className="fas fa-trash"></i>
            </button>
        </td>
    </tr>
);

// This component represents the form for adding a new contact.
const AddContactForm = ({ onSave, onCancel }) => {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        groupName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prevContact => ({ ...prevContact, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!contact.firstName || !contact.lastName || !contact.email || !contact.groupName) {
            // In a real app, you'd show a more user-friendly error message.
            console.error("All fields are required.");
            return;
        }
        onSave(contact);
        setContact({ firstName: '', lastName: '', email: '', groupName: '' }); // Reset form
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 animate-fade-in-down">
            <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name*</label>
                        <input type="text" id="first-name" name="firstName" value={contact.firstName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name*</label>
                        <input type="text" id="last-name" name="lastName" value={contact.lastName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                        <input type="email" id="email" name="email" value={contact.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="group-name" className="block text-sm font-medium text-gray-700">Group Name*</label>
                        <input type="text" id="group-name" name="groupName" value={contact.groupName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition">Cancel</button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">Save</button>
                </div>
            </form>
        </div>
    );
};

// Main App Component
export default function NewContacts() {
    const initialContacts = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', groupName: 'Linkedin', updatedOn: '2023-10-26' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', groupName: 'Gmail', updatedOn: '2023-10-25' },
    ];

    const [contacts, setContacts] = useState(initialContacts);
    const [showForm, setShowForm] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('');
        }
    };

    const handleSaveContact = (newContact) => {
        const updatedContact = {
            ...newContact,
            id: Date.now(), // simple unique id
            updatedOn: new Date().toISOString().split('T')[0],
        };
        setContacts(prevContacts => [updatedContact, ...prevContacts]);
        setShowForm(false);
    };

    const handleDeleteContact = (contactId) => {
        // In a real app, a confirmation modal would be better than window.confirm
        if (window.confirm('Are you sure you want to delete this contact?')) {
            setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
        }
    };
    
    // In a real app, this would likely open a modal with the contact's data pre-filled
    const handleEditContact = (contactId) => {
        alert(`Editing contact ID: ${contactId}. (Full functionality would be in a modal)`);
    }

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
                            <label htmlFor="file-upload" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer">
                                <i className={`fas ${fileName ? 'fa-check-circle' : 'fa-upload'} mr-2`}></i>
                                {fileName || 'Choose File'}
                            </label>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <i className="fas fa-file-import mr-2"></i>Import
                        </button>
                        <button onClick={() => setShowForm(!showForm)} className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ml-auto">
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
                                {['First Name', 'Last Name', 'Email', 'Group Name', 'Updated On', 'Action'].map(header => (
                                    <th key={header} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {contacts.length > 0 ? (
                                contacts.map(contact => (
                                    <ContactRow 
                                        key={contact.id} 
                                        contact={contact} 
                                        onDelete={() => handleDeleteContact(contact.id)}
                                        onEdit={() => handleEditContact(contact.id)}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-500">No contacts found. Add one!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}
