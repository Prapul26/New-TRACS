import React from 'react'
import { useState, useEffect } from 'react';
import '../../App.css';
const MakeIntroduction = () => {


  // State for member directory filter
  const [directoryFilter, setDirectoryFilter] = useState('All');
  // State for member search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for selected members
  const [selectedMembers, setSelectedMembers] = useState([]);
  // State for member search results
  const [memberResults, setMemberResults] = useState([]);
  // State for templates
  const [templates, setTemplates] = useState([]);
  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState('');
  // State for showing template modal
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  // State for error message visibility
  const [showSelectionError, setShowSelectionError] = useState(false);

  // Mock data for members (would normally come from API)
  const allMembers = [
    // This would be populated with actual member data
    // { id: 1, name: 'John Doe', email: 'john@example.com', type: 'H7', business: 'Tech Corp' },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Tracs', business: 'Design Inc' }
  ];

  // Mock data for templates (would normally come from API)
  const templateOptions = [
    { id: '1', name: 'Standard Introduction' },
    { id: '2', name: 'Business Collaboration' },
    { id: '3', name: 'Networking Request' }
  ];

  // Filter members based on directory and search query
  const filterMembers = () => {
    let results = [...allMembers];

    // Apply directory filter
    if (directoryFilter !== 'All') {
      results = results.filter(member => member.type === directoryFilter);
    }

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        (member.business && member.business.toLowerCase().includes(query))
      );
    }

    setMemberResults(results);
  };

  // Handle member selection
  const handleMemberSelect = (member) => {
    if (selectedMembers.length >= 2) {
      setShowSelectionError(true);
      return;
    }

    if (!selectedMembers.some(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
      setShowSelectionError(false);
    }
  };

  // Handle member removal
  const handleMemberRemove = (memberId) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId));
  };

  // Interchange selected members
  const interchangeMembers = () => {
    if (selectedMembers.length === 2) {
      setSelectedMembers([selectedMembers[1], selectedMembers[0]]);
    }
  };

  // Load template content
  const loadTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    // In a real app, you would fetch the template content here
  };

  // Toggle template modal
  const toggleTemplateModal = () => {
    setShowTemplateModal(!showTemplateModal);
  };

  // Initialize component
  useEffect(() => {
    // Load members and templates from API in a real app
    setTemplates(templateOptions);
    filterMembers();
  }, []);

  // Re-filter members when directory or search changes
  useEffect(() => {
    filterMembers();
  }, [directoryFilter, searchQuery]);
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Introduction Composer
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Effortlessly connect members with personalized email introductions.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Left Column: Member Search and Selection */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              1. Select Members
            </h2>

            {/* Member Directory Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="memberDirectory"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Members Directory
              </label>
              <select
                id="memberDirectory"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                value={directoryFilter}
                onChange={(e) => setDirectoryFilter(e.target.value)}
              >
                <option value="All">All Members</option>
                <option value="H7">H7 Member</option>
                <option value="Tracs">Tracs Member</option>
                <option value="Contacts">Contacts</option>
              </select>
            </div>

            {/* Member Search */}
            <div className="mb-4">
              <label
                htmlFor="memberSearch"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Members (Name, Email, Business)
              </label>
              <input
                type="text"
                id="memberSearch"
                placeholder="Type to search..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Member Search Results */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Search Results{' '}
                <span className="text-xs text-gray-500">({memberResults.length})</span>
              </p>
              <div
                id="memberSearchResults"
                className="scrollable-list border border-gray-200 rounded-lg divide-y divide-gray-100 bg-surface p-2 max-h-64 overflow-y-auto"
              >
                {memberResults.length > 0 ? (
                  memberResults.map((member) => (
                    <div
                      key={member.id}
                      className="p-2 hover:bg-gray-50 cursor-pointer rounded"
                      onClick={() => handleMemberSelect(member)}
                    >
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                      {member.business && (
                        <div className="text-xs text-gray-400">{member.business}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    {searchQuery || directoryFilter !== 'All'
                      ? 'No members found'
                      : 'Start typing or select a directory.'}
                  </p>
                )}
              </div>
            </div>

            {/* Selected Members */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Selected Members (Min 2)
                </h3>
                <button
                  id="interchangeBtn"
                  className={`px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full hover:bg-yellow-600 transition ${
                    selectedMembers.length !== 2
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-yellow-600'
                  }`}
                  onClick={interchangeMembers}
                  disabled={selectedMembers.length !== 2}
                >
                  Interchange
                </button>
              </div>

              <div
                id="selectedMembersList"
                className="min-h-[100px] border border-gray-200 rounded-lg p-3 space-y-2"
              >
                {selectedMembers.length > 0 ? (
                  selectedMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">
                          {index === 0 ? 'Receiver 1' : 'Receiver 2'}
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleMemberRemove(member.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-sm italic">
                    Select members from the list above.
                  </p>
                )}
              </div>
              {showSelectionError && (
                <p id="selectionError" className="text-red-500 text-sm mt-2">
                  ⚠️ Please select exactly two members (Receiver 1 and Receiver 2).
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Email Composition */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              2. Compose Email
            </h2>

            {/* Template Selection */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="sm:col-span-2">
                <label
                  htmlFor="templateSelect"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Template
                </label>
                <select
                  id="templateSelect"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                  value={selectedTemplate}
                  onChange={(e) => loadTemplate(e.target.value)}
                >
                  <option value="">Select a template</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="w-full sm:w-auto p-2 bg-secondary text-white font-medium rounded-lg hover:bg-green-600 transition"
                onClick={toggleTemplateModal}
              >
                + Create New Template
              </button>
            </div>

            {/* Template Modal (would be implemented separately) */}
            {showTemplateModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-4">Create New Template</h3>
                  {/* Modal content would go here */}
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-4 py-2 bg-gray-200 rounded mr-2"
                      onClick={toggleTemplateModal}
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded">
                      Save Template
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default MakeIntroduction
