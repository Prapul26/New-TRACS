import React from 'react'
import { useState, useEffect } from 'react';
import '../../App.css';
const MakeIntroduction = () => {

  // State for the application
  const [memberDirectory, setMemberDirectory] = useState('All');
  const [memberSearch, setMemberSearch] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberSearchResults, setMemberSearchResults] = useState([]);
  const [memberCount, setMemberCount] = useState(0);

  // Sample member data (in a real app, this would come from an API)
  const allMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', business: 'Tech Corp', type: 'H7' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', business: 'Design Co', type: 'Tracs' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', business: 'Consulting Inc', type: 'Contacts' },
    // Add more members as needed
  ];

  // Filter members based on directory and search term
  const filterMembers = () => {
    let filtered = allMembers;

    // Filter by directory
    if (memberDirectory !== 'All') {
      filtered = filtered.filter(member => member.type === memberDirectory);
    }

    // Filter by search term
    if (memberSearch) {
      const searchTerm = memberSearch.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.business.toLowerCase().includes(searchTerm)
      );
    }

    setMemberSearchResults(filtered);
    setMemberCount(filtered.length);
  };

  // Add member to selected list
  const addMember = (member) => {
    if (selectedMembers.length < 2 || !selectedMembers.some(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  // Remove member from selected list
  const removeMember = (memberId) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== memberId));
  };

  // Interchange selected members
  const interchangeMembers = () => {
    if (selectedMembers.length === 2) {
      setSelectedMembers([selectedMembers[1], selectedMembers[0]]);
    }
  };

  // Effect to filter members when directory or search changes
  useEffect(() => {
    filterMembers();
  }, [memberDirectory, memberSearch]);


  return (
  <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Introduction Composer</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Effortlessly connect members with personalized email introductions.</p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Left Column: Member Search and Selection */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">1. Select Members</h2>

            {/* Member Directory Dropdown */}
            <div className="mb-4">
              <label htmlFor="memberDirectory" className="block text-sm font-medium text-gray-700 mb-1">Members Directory</label>
              <select
                id="memberDirectory"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                value={memberDirectory}
                onChange={(e) => setMemberDirectory(e.target.value)}
              >
                <option value="All">All Members</option>
                <option value="H7">H7 Member</option>
                <option value="Tracs">Tracs Member</option>
                <option value="Contacts">Contacts</option>
              </select>
            </div>

            {/* Member Search */}
            <div className="mb-4">
              <label htmlFor="memberSearch" className="block text-sm font-medium text-gray-700 mb-1">Search Members (Name, Email, Business)</label>
              <input
                type="text"
                id="memberSearch"
                placeholder="Type to search..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
              />
            </div>

            {/* Member Search Results */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Search Results <span className="text-xs text-gray-500">({memberCount})</span></p>
              <div className="scrollable-list border border-gray-200 rounded-lg divide-y divide-gray-100 bg-surface p-2">
                {memberSearchResults.length > 0 ? (
                  memberSearchResults.map(member => (
                    <div key={member.id} className="p-2 hover:bg-gray-50 cursor-pointer" onClick={() => addMember(member)}>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                      <p className="text-sm text-gray-500">{member.business}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">Start typing or select a directory.</p>
                )}
              </div>
            </div>

            {/* Selected Members */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Selected Members (Min 2)</h3>
                <button
                  id="interchangeBtn"
                  className={`px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full hover:bg-yellow-600 transition ${selectedMembers.length !== 2 ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
                  onClick={interchangeMembers}
                  disabled={selectedMembers.length !== 2}
                >
                  Interchange
                </button>
              </div>

              <div className="min-h-[100px] border border-gray-200 rounded-lg p-3 space-y-2">
                {selectedMembers.length > 0 ? (
                  selectedMembers.map(member => (
                    <div key={member.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeMember(member.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-sm italic">Select members from the list above.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MakeIntroduction
