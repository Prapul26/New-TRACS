import React, { useEffect, useState } from 'react'
import "./ReplyMessage.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
const ReplyMessage = () => {
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

    <aside className="bg-[#1a202c] w-64 flex-shrink-0 hidden lg:block h-[100%]">
      <div className="p-6">
        <a href="#" className="text-white text-2xl font-bold">TRACS</a>
      </div>
      <nav className="mt-6">
        {sections.map(section => <SidebarSection key={section.title} {...section} />)}
      </nav>
    </aside>
  );
};


    // Mock data - in a real app, this would come from an API


    // State for the message body
    const [messageBody, setMessageBody] = useState('');

    // State for the include signature checkbox
    const [includeSignature, setIncludeSignature] = useState(true);

    // State for the selected template
    const [selectedTemplate, setSelectedTemplate] = useState('');

    // State for the modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Mock data for recipients and templates
    const recipients = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];

    const templates = [
        { id: 1, name: 'Follow-up', content: 'Hi [Name],\n\nI hope this message finds you well.\n\n[Your message here]\n\nBest regards,' },
        { id: 2, name: 'Thank You', content: 'Dear [Name],\n\nThank you for your message. We appreciate your time and effort.\n\nBest regards,' },
        { id: 3, name: 'Reminder', content: 'Hi [Name],\n\nThis is a friendly reminder about [topic].\n\nPlease let me know if you have any questions.\n\nBest regards,' }
    ];

    // Mock data for previous messages
    const previousMessages = [
        { id: 1, subject: 'Project Update', date: '2023-05-15', sender: 'Team Lead' },
        { id: 2, subject: 'Meeting Reminder', date: '2023-05-10', sender: 'HR Department' },
        { id: 3, subject: 'Document Review', date: '2023-05-05', sender: 'Project Manager' }
    ];

    // Function to handle template selection
    const handleTemplateChange = (e) => {
        const templateId = parseInt(e.target.value);
        const template = templates.find(t => t.id === templateId);
        if (template) {
            setMessageBody(template.content);
            setSelectedTemplate(templateId);
        }
    };

    // Function to simulate sending a message
    const simulateSend = () => {
        setModalMessage('Message sent successfully!');
        setShowModal(true);
        // Reset form after sending
        setMessageBody('');
        setSelectedTemplate('');
    };

    // Function to simulate canceling
    const simulateCancel = () => {
        setMessageBody('');
        setSelectedTemplate('');
        setModalMessage('Message draft cleared.');
        setShowModal(true);
    };

    // Function to simulate creating a new template
    const simulateCreateTemplate = () => {
        setModalMessage('Template creation feature would be implemented here.');
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };
    
 const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
      const[name,setName]=useState("")
    
  
  const fetchProfile = async () => {
    try {
      const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: token },
      });

      const data = response.data;
     
      setName(data.user.name || "");

      setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);

  
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
    return (
        <div style={{display:"flex"}}>
            <div><Sidebar /></div>
       <div style={{width:"100%"}}> 
          <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
                          <div className="flex items-center">
                              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 lg:hidden">
                                  <Icon name="menu" className="w-6 h-6" />
                              </button>
                              <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0"></h1>
                          </div>
        
                          <div className="flex items-center space-x-4">
                              <Link to="/test" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
                                  View Profile
                              </Link>
                              <div className="relative">
                                  <button className="flex items-center space-x-2">
                                      <img src={imagePreview} alt="User Avatar" className="h-10 w-10 rounded-full" />
                                      <span className="hidden md:block">{name}</span>
                                      <Icon name="chevron-down" className="w-4 h-4" />
                                  </button>
                              </div>
                          </div>
                      </header>
        <div className="p-4 md:p-8" style={{width:"100%"}}>
            <div className="max-w-1xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Reply to Message</h1>

                {/* Single Column Layout (Reply Composer & History Stacked) */}
                <div className="space-y-8">

                    {/* Reply Composer (Full Width) */}
                    <div className="bg-white p-6 rounded-xl message-box-shadow">

                        {/* 1. Selectable Recipients (Checkboxes) */}
                        <div className="mb-6 pb-4 border-b">
                            <p className="text-sm font-medium text-gray-700 mb-2">Select recipients (excluding yourself):</p>
                            <div id="recipient-checkbox-container" className="flex flex-wrap gap-x-6 gap-y-3">
                                {recipients.map(recipient => (
                                    <div key={recipient.id} className="flex items-center">
                                        <input
                                            id={`recipient-${recipient.id}`}
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                        <label htmlFor={`recipient-${recipient.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                                            {recipient.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Email Template Selection & Creation */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-3 md:space-y-0">
                            <label htmlFor="template-select" className="text-sm font-medium text-gray-700 w-full md:w-auto">Select Template:</label>
                            <select
                                id="template-select"
                                value={selectedTemplate}
                                onChange={handleTemplateChange}
                                className="flex-grow md:max-w-xs p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            >
                                <option value="">-- Select a template --</option>
                                {templates.map(template => (
                                    <option key={template.id} value={template.id}>
                                        {template.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={simulateCreateTemplate}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition duration-200 shadow-md whitespace-nowrap"
                            >
                                + Create New Template
                            </button>
                        </div>

                        {/* 3. Message Body */}
                        <textarea
                            id="message-body"
                            rows="10"
                            value={messageBody}
                            onChange={(e) => setMessageBody(e.target.value)}
                            placeholder="Type your message here. The selected template content will populate this area."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-700 resize-y"
                        />

                        {/* 4. Include Signature Option */}
                        <div className="flex items-center mt-3 mb-6">
                            <input
                                id="include-signature"
                                type="checkbox"
                                checked={includeSignature}
                                onChange={(e) => setIncludeSignature(e.target.checked)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor="include-signature" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                                Include my signature
                            </label>
                        </div>

                        {/* 5. Send and Cancel Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={simulateCancel}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition duration-200 shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={simulateSend}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-200"
                            >
                                Send Message
                            </button>
                        </div>

                    </div>

                    {/* 6. Previous Messages List (Full Width, Stacked Below) */}
                    <div className="bg-white p-6 rounded-xl message-box-shadow" style={{overflowY:"auto",height:"500px"}}>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Previous Messages</h2>
                        <div id="MessagesContainer">
                            <div id="MessagesContainer1">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-400 text-white rounded-full text-xs font-bold">AJ</div>
                                <div className='ml-2'><strong>Alex Johnson</strong>
                                    <p>2 hours ago</p></div>
                                <div className='ml-2'><p>{"("}Manager{")"}</p></div>
                            </div>
                            <div id="MessagesContainer2">
                                <p>         Hi Sarah and Alex, happy to make this connection! John is a fantastic lead engineer. I'll let you two take it from here.</p>
                            </div>
                        </div>
                        <div id="MessagesContainer">
                            <div id="MessagesContainer1">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-400 text-white rounded-full text-xs font-bold">AJ</div>
                                <div className='ml-2'><strong>Alex Johnson</strong>
                                    <p>2 hours ago</p></div>
                                <div className='ml-2'><p>{"("}Manager{")"}</p></div>
                            </div>
                            <div id="MessagesContainer2">
                                <p>         Hi Sarah and Alex, happy to make this connection! John is a fantastic lead engineer. I'll let you two take it from here.</p>
                            </div>
                        </div>
                        <div id="MessagesContainer">
                            <div id="MessagesContainer1">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-400 text-white rounded-full text-xs font-bold">AJ</div>
                                <div className='ml-2'><strong>Alex Johnson</strong>
                                    <p>2 hours ago</p></div>
                                <div className='ml-2'><p>{"("}Manager{")"}</p></div>
                            </div>
                            <div id="MessagesContainer2">
                                <p>         Hi Sarah and Alex, happy to make this connection! John is a fantastic lead engineer. I'll let you two take it from here.</p>
                            </div>
                        </div>
                        <div id="MessagesContainer">
                            <div id="MessagesContainer1">
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-400 text-white rounded-full text-xs font-bold">AJ</div>
                                <div className='ml-2'><strong>Alex Johnson</strong>
                                    <p>2 hours ago</p></div>
                                <div className='ml-2'><p>{"("}Manager{")"}</p></div>
                            </div>
                            <div id="MessagesContainer2">
                                <p>         Hi Sarah and Alex, happy to make this connection! John is a fantastic lead engineer. I'll let you two take it from here.</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Custom Modal for Alerts */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification</h3>
                        <p className="text-gray-600 mb-6">{modalMessage}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div> 
       </div> 
        </div>
    );
}

export default ReplyMessage
