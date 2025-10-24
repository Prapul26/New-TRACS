import React from 'react'
import { useState, useEffect } from 'react';
import '../../App.css';
import "./MakeIntroduction.css"
import { Link } from 'react-router-dom';
const MakeIntroduction = () => {

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
        { icon: 'credit-card', text: 'My Membership', to: '/myMembership', to: '/myMembership' },
        { icon: 'user', text: 'My Profile', to: '/myProfile' , to: '/myProfile'},
        { icon: 'lock', text: 'Change Password', to: '/changePassword' , to: '/changePassword' },
        { icon: 'link', text: 'Affiliation' },
      ],
    },
    {
      title: 'Introductions',
      links: [
        { icon: 'inbox', text: 'Introduction Messages', active: true , to: '/' },
        { icon: 'users', text: 'My Contacts' , to: '/myContacts'},
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
  const details=[
    {id:'1',name:"Jane Doe",img:'https://placehold.co/40x40/4f46e5/ffffff?text=JD',company:"Doe Consulting",type:"H7",email:"jane@gmail.com"},
     {id:'2',name:"Robert Smith",img:'https://placehold.co/40x40/green/ffffff?text=RS',company:"Web Solutions Co.",type:"Tracs",email:"robert@gmail.com"},
      {id:'3',name:"Emily Clark",img:'https://placehold.co/40x40/red/ffffff?text=EC',company:"Clark Law Firm",type:"Contacts",email:"emily@gmail.com"},
       {id:'4',name:"David Lee",img:'https://placehold.co/40x40/yellow/black?text=DL',company:"Lee Financial",type:"H7",email:"david@gmail.com"}
  ]

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
    <div style={{display:'flex'}}><div><Sidebar /></div>
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans" style={{width:"100%"}}>
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
                {details.length > 0 ? (
                  details.map((member) => (
                    <div
                      key={member.id}
                      className="flex p-2 hover:bg-gray-50 cursor-pointer rounded "
                      style={{justifyContent:"space-between"}}
                      onClick={() => handleMemberSelect(member)}
                    >

                     
                     <div className='flex'> <div><img src={member.img} style={{borderRadius:"50%",marginRight:"15px",marginTop:"10px"}} /></div>
                    <div>
                      <div><div className="flex  font-medium">{member.name}<div className='ml-2'>{"( "}{member.type}{" )"}</div></div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                      {member.company && (
                        <div className="text-xs text-gray-400">{member.company}</div>
                      )}</div></div>
                      </div>
                      <div><button style={{background:"#4f46e5",padding:'4px 8px',borderRadius:"12px",color:"white"}}>select</button></div>
                      
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
                className="w-full sm:w-auto p-2  text-white font-medium rounded-lg hover:bg-green-600 transition"
                onClick={toggleTemplateModal}
                style={{background:"green"}}
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
            <div><label className='br'>Subject</label></div>
            <div ><input className='mt-1 bg-green-50 border-1 border-black pr-2 pl-2 pt-2 pb-2 w-full' placeholder='subject will populate automatically'/></div>
            <div><p className='text-[13px] mt-2 '>**Subject structure:** [Introducer Name] connecting [Receiver 1 Name] & [Receiver 2 Name]</p></div>
            <div className='mt-[20px]'><label>Message Body</label></div>
            <div><textarea  className='w-full h-[200px] border-black border-[1px] mt-2 rounded-4'/></div>
           <div><p className='text-[13px] mt-2 '>*Available Tokens: **[INT_NAME]**, **[R1_NAME]**, **[R1_EMAIL]**, **[R2_NAME]**, **[R2_EMAIL]**.</p></div>
           <div className='dicvd'>
            <div className='replaceButton'><button>Replace Tokens</button></div>
            <div><input type='checkbox' checked/><lable>Signature</lable></div>
           </div>
           <div className='dicvd2'>  <div><button id="but2">Cancle</button></div>
            <div><button id="but1">Send Introduction</button></div>
          
           </div>
          </div>
        </div>
      </div>
    </div></div>
  
  )
}

export default MakeIntroduction
