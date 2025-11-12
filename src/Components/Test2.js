import React, { useState } from 'react';

// --- Icon Imports (using lucide-react) ---
// We'll import all icons needed for the app here
import {
    CreditCard,
    UserCircle,
    KeyRound,
    Handshake,
    MessagesSquare,
    Users,
    Mail,
    Signature,
    HelpCircle,
    Phone,
    BookOpen,
    Menu,
    PlusCircle,
    Search,
    ChevronDown,

} from 'lucide-react';

// --- Dummy Data ---
// Using the data from the HTML to populate the app
const initialMessages = [
    {
        id: 1,
        sender: {
            name: "Anil Sharma",
            avatar: "https://placehold.co/40x40/E2E8F0/475569?text=AS"
        },
        timestamp: "2 days ago",
        subject: "Intro: Priya Sharma <> David Chen",
        receivers: [
            { name: "Priya Sharma", avatar: "https://placehold.co/80x80/94A3B8/FFFFFF?text=PS", replies: "3 replies" },
            { name: "David Chen", avatar: "https://placehold.co/80x80/64748B/FFFFFF?text=DC", replies: "1 reply" }
        ],
        latestMessage: {
            sender: "Priya Sharma",
            avatar: "https://placehold.co/40x40/94A3B8/FFFFFF?text=PS",
            text: "Sounds great, David! Let's connect next week. My calendar is open on Tuesday.",
            timestamp: "Oct 16, 2:45 PM"
        },
        status: 'active'
    },
    {
        id: 2,
        sender: {
            name: "You",
            avatar: "https://placehold.co/40x40/0284C7/FFFFFF?text=T"
        },
        timestamp: "5 days ago",
        subject: "Intro: Michael B. <> Sarah Jenkins",
        receivers: [
            { name: "Michael B.", avatar: "https://placehold.co/80x80/D1D5DB/1F2937?text=MB", replies: "No replies" },
            { name: "Sarah Jenkins", avatar: "https://placehold.co/80x80/9CA3AF/111827?text=SJ", replies: "No replies" }
        ],
        latestMessage: null,
        status: 'follow-up'
    },
    {
        id: 3,
        sender: {
            name: "Anil Sharma",
            avatar: "https://placehold.co/40x40/E2E8F0/475569?text=AS"
        },
        timestamp: "1 month ago",
        subject: "Intro: Kenji Tanaka <> Emily Rodriguez",
        receivers: [
            { name: "Kenji Tanaka", avatar: "https://placehold.co/80x80/FECACA/7F1D1D?text=KT", replies: "2 replies" },
            { name: "Emily Rodriguez", avatar: "https://placehold.co/80x80/BFDBFE/1E40AF?text=ER", replies: "2 replies" }
        ],
        latestMessage: {
            sender: "Emily Rodriguez",
            avatar: "https://placehold.co/40x40/BFDBFE/1E40AF?text=ER",
            text: "Thanks, Kenji! Great chatting.",
            timestamp: "Sep 28, 10:15 AM"
        },
        status: 'archived'
    },
    {
        id: 4,
        sender: {
            name: "You",
            avatar: "https://placehold.co/40x40/0284C7/FFFFFF?text=T"
        },
        timestamp: "10 days ago",
        subject: "Intro: Dr. Lena Hayes <> Ben Carter",
        receivers: [
            { name: "Dr. Lena Hayes", avatar: "https://placehold.co/80x80/A78BFA/4C1D95?text=LH", replies: "1 reply" },
            { name: "Ben Carter", avatar: "https://placehold.co/80x80/FDBA74/A15207?text=BC", replies: "No replies" }
        ],
        latestMessage: {
            sender: "Dr. Lena Hayes",
            avatar: "https://placehold.co/40x40/A78BFA/4C1D95?text=LH",
            text: "Thank you for the introduction! Ben, looking forward to connecting.",
            timestamp: "Oct 18, 9:30 AM"
        },
        status: 'active'
    }
];

// --- Page Definitions ---
const PAGES = {
    INTRO_MESSAGES: {
        id: 'intro-messages',
        title: 'Introductions',
        subtitle: 'Manage your professional introductions.'
    },
    MY_CONTACTS: {
        id: 'my-contacts',
        title: 'My Contacts',
        subtitle: 'Manage your professional contacts.'
    },
    MAKE_INTRODUCTION: {
        id: 'make-introduction',
        title: 'New Introduction',
        subtitle: 'Create and send a new introduction.'
    },
    // Add other pages here
    MY_MEMBERSHIP: { id: 'my-membership', title: 'My Membership', subtitle: 'View your membership details.' },
    MY_PROFILE: { id: 'my-profile', title: 'My Profile', subtitle: 'Update your profile information.' },
    CHANGE_PASSWORD: { id: 'change-password', title: 'Change Password', subtitle: 'Secure your account.' },
    AFFILIATION: { id: 'affiliation', title: 'Affiliation', subtitle: 'Manage your affiliations.' },
    EMAIL_TEMPLATES: { id: 'email-templates', title: 'Email Templates', subtitle: 'Create and manage email templates.' },
    EMAIL_SIGNATURE: { id: 'email-signature', title: 'Email Signature', subtitle: 'Set up your email signature.' },
    APP_HELP: { id: 'app-help', title: 'App Help', subtitle: 'Get help with the TRACS app.' },
    CONTACT_US: { id: 'contact-us', title: 'Contact Us', subtitle: 'Get in touch with support.' },
    NETWORKING_101: { id: 'networking-101', title: 'Networking 101', subtitle: 'Learn the basics of networking.' },
};

// --- Sidebar Navigation Structure ---
const sidebarNav = [
    {
        heading: "Account Settings",
        items: [
            { id: PAGES.MY_MEMBERSHIP.id, label: "My Membership", icon: CreditCard },
            { id: PAGES.MY_PROFILE.id, label: "My Profile", icon: UserCircle },
            { id: PAGES.CHANGE_PASSWORD.id, label: "Change Password", icon: KeyRound },
            { id: PAGES.AFFILIATION.id, label: "Affiliation", icon: Handshake },
        ]
    },
    {
        heading: "Introductions",
        items: [
            { id: PAGES.INTRO_MESSAGES.id, label: "Introduction Messages", icon: MessagesSquare },
            { id: PAGES.MY_CONTACTS.id, label: "My Contacts", icon: Users },
            { id: PAGES.EMAIL_TEMPLATES.id, label: "Email Templates", icon: Mail },
            { id: PAGES.EMAIL_SIGNATURE.id, label: "Email Signature", icon: Signature },
        ]
    },
    {
        heading: "Resources",
        items: [
            { id: PAGES.APP_HELP.id, label: "App Help", icon: HelpCircle },
            { id: PAGES.CONTACT_US.id, label: "Contact Us", icon: Phone },
            { id: PAGES.NETWORKING_101.id, label: "Networking 101", icon: BookOpen },
        ]
    }
];

// --- 1. Main App Component (Root) ---
export default function Test2() {
    const [currentPage, setCurrentPage] = useState(PAGES.INTRO_MESSAGES.id);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Get the current page's title and subtitle
    const currentPageInfo = Object.values(PAGES).find(p => p.id === currentPage) || PAGES.INTRO_MESSAGES;

    const handleSetPage = (pageId) => {
        setCurrentPage(pageId);
        if (window.innerWidth < 768) { // md breakpoint
            setIsSidebarOpen(false);
        }
        console.log("Navigating to:", pageId);
    };
    
    const handleMakeIntroduction = () => {
        setCurrentPage(PAGES.MAKE_INTRODUCTION.id);
        console.log("Opening Make Introduction page");
    };

    return (
        <div className="relative min-h-screen md:flex text-slate-800">
            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                currentPage={currentPage}
                onSetPage={handleSetPage}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50">
                    <Header
                        title={currentPageInfo.title}
                        subtitle={currentPageInfo.subtitle}
                        onToggleSidebar={() => setIsSidebarOpen(true)}
                        onMakeIntroduction={handleMakeIntroduction}
                    />

                    {/* Page Content Area */}
                    <div id="page-content-wrapper">
                        {/* Conditional rendering of pages */}
                        {currentPage === PAGES.INTRO_MESSAGES.id && (
                            <IntroductionMessagesPage />
                        )}
                        {currentPage === PAGES.MAKE_INTRODUCTION.id && (
                            <MakeIntroductionPage onCancel={() => handleSetPage(PAGES.INTRO_MESSAGES.id)} />
                        )}
                        {currentPage === PAGES.MY_CONTACTS.id && (
                            <MyContactsPage />
                        )}
                        {/* Other pages need to be created and rendered here */}
                        {![PAGES.INTRO_MESSAGES.id, PAGES.MAKE_INTRODUCTION.id, PAGES.MY_CONTACTS.id].includes(currentPage) && (
                            <PlaceholderPage pageTitle={currentPageInfo.title} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

// --- 2. Sidebar Component ---
function Sidebar({ isOpen, currentPage, onSetPage }) {
    return (
        <aside 
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
            <div className="flex items-center justify-center p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 tracking-wider">TRACS</h2>
            </div>
            <nav id="sidebar-nav" className="p-4 space-y-6">
                {sidebarNav.map((section) => (
                    <div key={section.heading}>
                        <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            {section.heading}
                        </h3>
                        {section.items.map((item) => (
                            <SidebarLink
                                key={item.id}
                                Icon={item.icon}
                                label={item.label}
                                isActive={currentPage === item.id}
                                onClick={() => onSetPage(item.id)}
                            />
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    );
}

// --- 3. SidebarLink Sub-component ---
function SidebarLink({ Icon, label, isActive, onClick }) {
    return (
        <h2
           
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`menu-link flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
            <Icon className={`w-5 h-5 ${isActive ? 'font-bold' : ''}`} />
            <span>{label}</span>
        </h2>
    );
}

// --- 4. Header Component ---
function Header({ title, subtitle, onToggleSidebar, onMakeIntroduction }) {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="flex items-center">
                <button
                    id="mobile-menu-button"
                    className="md:hidden mr-4 text-slate-800 hover:text-blue-600"
                    onClick={onToggleSidebar}
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div>
                    <h1 id="main-header-title" className="text-3xl font-bold text-slate-900">
                        {title}
                    </h1>
                    <p id="main-header-subtitle" className="text-slate-500 mt-1">
                        {subtitle}
                    </p>
                </div>
            </div>
            <button
                id="makeIntroductionBtn"
                onClick={onMakeIntroduction}
                className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 mt-4 sm:mt-0 flex items-center gap-2"
            >
                <PlusCircle className="w-5 h-5" />
                Make an Introduction
            </button>
        </header>
    );
}

// --- 5. IntroductionMessagesPage Component (Page 1) ---
function IntroductionMessagesPage() {
    return (
        <div id="introduction-messages-page" className="page-content">
            {/* Filter Section */}
            <FilterSection />
            
            {/* Message List */}
            <MessageList />
        </div>
    );
}

// --- 6. FilterSection Component ---
function FilterSection() {
    return (
        <div className="mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                    {/* Search Bar */}
                    <div className="w-full sm:flex-grow">
                        <label htmlFor="searchInput" className="block text-sm font-medium text-slate-600 mb-1">
                            Search
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                id="searchInput"
                                placeholder="Search introductions..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                    </div>
                    
                    {/* Filter for Status (Dropdown) */}
                    <div className="w-full sm:w-auto">
                        <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-600 mb-1">
                            Status
                        </label>
                        <div className="relative">
                            <select
                                id="statusFilter"
                                className="w-full sm:w-52 appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="all-intros">All Introductions</option>
                                <option value="messages-sent">Messages Sent</option>
                                <option value="messages-received">Messages Received</option>
                                <option value="follow-up">Follow-up</option>
                                <option value="archive">Archive</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>

                    {/* Sort by (Dropdown) */}
                    <div className="w-full sm:w-auto">
                        <label htmlFor="sortFilter" className="block text-sm font-medium text-slate-600 mb-1">
                            Sort by
                        </label>
                        <div className="relative">
                            <select
                                id="sortFilter"
                                className="w-full sm:w-48 appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- 7. MessageList Component ---
function MessageList() {
    const [messages] = useState(initialMessages);

    // In a real app, you'd filter/sort `messages` based on state
    
    return (
        <div className="space-y-4" id="messageList">
            {messages.map((msg) => (
                <MessageCard key={msg.id} message={msg} />
            ))}
        </div>
    );
}

// --- 8. MessageCard Component ---
function MessageCard({ message }) {
    const { sender, timestamp, subject, receivers, latestMessage, status } = message;

    return (
        <div 
            className={`message-card bg-white rounded-xl shadow-sm border border-slate-200 p-5 transition-all duration-300 ${status === 'archived' ? 'opacity-70' : ''}`}
        >
            {/* Sender details */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <img src={sender.avatar} alt="Introducer Avatar" className="w-7 h-7 rounded-full object-cover border-2 border-white shadow" />
                <span>{sender.name}</span>
                <span>&bull;</span>
                <span>{timestamp}</span>
            </div>
            
            {/* Intro subject */}
            <h2 className="font-bold text-lg text-slate-900 mb-4">{subject}</h2>
            
            {/* Receivers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                {receivers.map((r, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <img src={r.avatar} alt="Receiver Avatar" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold text-slate-800">{r.name}</p>
                            <p className="text-sm text-slate-500">{r.replies}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Latest Message */}
            {latestMessage && (
                <div className="bg-slate-50 rounded-lg p-4 mt-4 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-600 mb-2">Latest Message</p>
                    <div className="flex items-start gap-3">
                         <img src={latestMessage.avatar} alt="Latest message user avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                         <div className="flex-1">
                             <p className="text-slate-700 text-sm">
                                <strong>{latestMessage.sender}:</strong> {latestMessage.text}
                             </p>
                             <p className="text-xs text-slate-400 text-right mt-1">{latestMessage.timestamp}</p>
                         </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-200">
                <button className="bg-white text-slate-700 border border-slate-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">View</button>
                <button className="bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors duration-200">Reply</button>
                
                {status === 'active' && (
                    <button className="bg-slate-100 text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors duration-200">Archive</button>
                )}
                {status === 'follow-up' && (
                    <button className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200">Follow up</button>
                )}
                {status === 'archived' && (
                    <button className="bg-slate-100 text-slate-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors duration-200">Unarchive</button>
                )}
            </div>
        </div>
    );
}

// --- 9. MakeIntroductionPage Component (Page 2) ---
function MakeIntroductionPage({ onCancel }) {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Introduction form submitted");
        // In a real app, send data to server
        alert("Introduction sent (simulation)!"); // Use a modal in a real app
        onCancel(); // Go back to the list
    };
    
    return (
        <div id="make-introduction-page" className="page-content">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-8 max-w-4xl mx-auto">
                <form id="introduction-form" className="space-y-6" onSubmit={handleSubmit}>
                    {/* Receiver 1 */}
                    <fieldset>
                        <legend className="text-lg font-semibold text-slate-800 mb-3">Receiver 1</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="r1-name" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                                <input type="text" id="r1-name" name="r1-name" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="r1-email" className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                                <input type="email" id="r1-email" name="r1-email" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </fieldset>
                    
                    {/* Receiver 2 */}
                    <fieldset>
                        <legend className="text-lg font-semibold text-slate-800 mb-3">Receiver 2</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="r2-name" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                                <input type="text" id="r2-name" name="r2-name" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="r2-email" className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                                <input type="email" id="r2-email" name="r2-email" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </fieldset>

                    {/* Message */}
                    <fieldset>
                        <legend className="text-lg font-semibold text-slate-800 mb-3">Message</legend>
                        <div>
                            <label htmlFor="intro-subject" className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
                            <input type="text" id="intro-subject" name="intro-subject" placeholder="Intro: [Receiver 1] <> [Receiver 2]" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="intro-message" className="block text-sm font-medium text-slate-600 mb-1">Body</label>
                            <textarea id="intro-message" name="intro-message" rows="10" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Hi [Receiver 1] and [Receiver 2],&#10;&#10;I'd like to introduce you..."></textarea>
                        </div>
                    </fieldset>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                        <button 
                            type="button" 
                            id="cancel-intro-btn" 
                            onClick={onCancel}
                            className="bg-white text-slate-700 border border-slate-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                            Send Introduction
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- 10. MyContactsPage Component (Page 3) ---
function MyContactsPage() {
    return (
        <div id="my-contacts-page" className="page-content">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">My Contacts</h2>
                <p className="text-slate-600">This is where your contacts list will go. You could show a grid or list of user cards here.</p>
                {/* Example of adding contacts */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ContactCard name="Priya Sharma" title="Software Engineer" avatar="https://placehold.co/80x80/94A3B8/FFFFFF?text=PS" />
                    <ContactCard name="David Chen" title="Product Manager" avatar="https://placehold.co/80x80/64748B/FFFFFF?text=DC" />
                    <ContactCard name="Michael B." title="UX Designer" avatar="https://placehold.co/80x80/D1D5DB/1F2937?text=MB" />
                </div>
             </div>
        </div>
    );
}

// --- 11. ContactCard Sub-component ---
function ContactCard({ name, title, avatar }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <img src={avatar} alt={name} className="w-16 h-16 rounded-full" />
            <div>
                <p className="font-semibold text-slate-800">{name}</p>
                <p className="text-sm text-slate-500">{title}</p>
            </div>
        </div>
    );
}

// --- 12. PlaceholderPage Component (for unbuilt pages) ---
function PlaceholderPage({ pageTitle }) {
    return (
        <div className="page-content">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{pageTitle}</h2>
                <p className="text-slate-600">This page is not yet built. Content for "{pageTitle}" will go here.</p>
             </div>
        </div>
    );
}
