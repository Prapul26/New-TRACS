import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Main App Component
export default function EmailSignaature() {
    // State to hold the signature text from the textarea
    const [signature, setSignature] = useState('');
    // State to control the visibility of the success toast
    const [showToast, setShowToast] = useState(false);

    // Effect to hide the toast message after 3 seconds
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            // Cleanup function to clear the timer if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    // Handles changes in the textarea input
    const handleInputChange = (event) => {
        setSignature(event.target.value);
    };

    // Handles the save button click
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
        const userID = localStorage.getItem("userId")
        setLoading(true);
        try {
            await axios.post("https://tracsdev.apttechsol.com/api/signature_store_form", {
                name: signature, user_id: userID,
            }, {
                headers: { Authorization: token },
            });
            setShowToast(true);
        } catch (err) {
            console.error("Error saving signature:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
                const response = await axios.get(
                    `https://tracsdev.apttechsol.com/api/sendmailintro/introduction_email`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );


                setSignature(response.data.signature?.name || "");
                console.log(response.data);
            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, []);
    // Handles the cancel button click
    const handleCancel = () => {
        setSignature(''); // Clear the input field
        console.log('Signature changes cancelled.');
    };

    // Renders the signature with line breaks for the preview
    const renderPreview = () => {
        if (!signature.trim()) {
            return <p className="text-gray-400">Your signature appears here...</p>;
        }
        // Using dangerouslySetInnerHTML to render HTML from state (e.g., <br> tags)
        // This is safe here as the content is user-generated on the client-side.
        return <div dangerouslySetInnerHTML={{ __html: signature.replace(/\n/g, '<br>') }} />;
    };
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
                { icon: 'credit-card', text: 'My Membership' , to: '/myMembership'},
                { icon: 'user', text: 'My Profile', to: '/myProfile'},
                { icon: 'lock', text: 'Change Password', to: '/changePassword' },
                { icon: 'link', text: 'Affiliation' },
            ],
        },
        {
            title: 'Introductions',
            links: [
                { icon: 'inbox', text: 'Introduction Messages', to: '/' },
                { icon: 'users', text: 'My Contacts', to: '/myContacts'},
                { icon: 'mail', text: 'Email Templates' , to: '/emailTemplate'},
                { icon: 'pen-square', text: 'Email Signature', active: true  },
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


    return (
        <div style={{display:"flex"}}><div><Sidebar /></div>
        <div className="bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 lg:p-8" style={{width:"100%"}}>
            <div className="container mx-auto max-w-4xl">
 <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Email Signature</h1>
                    <p className="text-gray-600 mt-1">Create and manage your professional email signature.</p>
                </header>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    {/* Main Content Area */}
                    <div className="gap-8">

                        {/* Left Side: Input Form */}
                        <div className="flex flex-col space-y-6">
                            <div>
                                <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
                                <textarea
                                    id="signature"
                                    name="signature"
                                    rows="8"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                    placeholder="Enter your signature details here... e.g., Your Name, Title, etc."
                                    value={signature}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-4">
                                <button
                                    onClick={handleCancel}
                                    type="button"
                                    className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    type="button"
                                    className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition duration-150 ease-in-out"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Live Preview */}
                        { /*<div className="flex flex-col">
                            <h2 className="text-sm font-medium text-gray-700 mb-2">Preview</h2>
                            <div className="flex-grow p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-[200px]">
                                <div className="text-sm text-gray-500">
                                    <p>Hello,</p>
                                    <br />
                                    <p>This is a preview of how your email will look.</p>
                                    <br />
                                    <p>Best regards,</p>
                                    <div className="border-t border-gray-300 w-24 my-3"></div>
                                    <div className="text-gray-800 whitespace-pre-wrap transition-all duration-300 ease-in-out">
                                        {renderPreview()}
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>

                {/* Success Message Toast */}
                <div className={`fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl transition-all duration-300 ease-out ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Signature saved successfully!
                </div>
               
            </div>
        </div></div>
    );
}
