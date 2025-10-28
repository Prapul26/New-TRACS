import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// --- Icon Components (using Font Awesome classes) ---
// In a real React app, you'd typically use a library like `react-icons`
const Icon = ({ className }) => <i className={className}></i>;

// --- Gallery Component ---
const galleryImages = [
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&h=400&auto=format&fit=crop", alt: "Team collaborating" },
    { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&h=400&auto=format&fit=crop", alt: "Business meeting" },
    { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&h=400&auto=format&fit=crop", alt: "Professionals working" },
    { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&h=400&auto=format&fit=crop", alt: "Team planning session" },
];

const Gallery = ({ profile }) => (
  <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Gallery</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {profile.gallery && profile.gallery.length > 0 ? (
        profile.gallery.map((photo, index) => (
          <img
            key={index}
            src={`https://tracsdev.apttechsol.com/public/${photo.image}`}
            alt={`Gallery Image ${index + 1}`}
            className="rounded-lg shadow-md w-full h-auto object-cover aspect-square hover:scale-105 transition-transform duration-300"
          />
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
          No gallery images available
        </p>
      )}
    </div>
  </div>
);



// --- Reusable Profile and Contact Info Components ---
const UserProfile = {
    name: "Alex Doe",
    title: "H7 Member",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=128&h=128&auto=format&fit=crop",
    businessName: "Innovate Solutions Inc.",
    email: "alex.doe@example.com",
    phone: "+1 (234) 567-890",
    website: "innovatesolutions.com",
    linkedin: "linkedin.com/in/alexdoe",
    linkedinUrl: "https://www.linkedin.com/in/alexdoe",
    websiteUrl: "https://www.innovatesolutions.com",
    about: "Innovate Solutions Inc. is a forward-thinking technology company dedicated to creating cutting-edge software that solves real-world problems. Our mission is to empower businesses with tools that drive efficiency, growth, and innovation. We believe in the power of collaboration and are committed to building long-lasting partnerships with our clients.",
};


const AboutSection = ({profile}) => (
     <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {profile.about}
        </p>
    </div>
);


// --- Layout Switcher Component ---
const LayoutSwitcher = ({ activeLayout, setActiveLayout }) => {
    const layouts = ['card', 'two-column', 'banner'];
    const layoutNames = {
        card: 'Card View',
        'two-column': 'Two-Column',
        banner: 'Banner',
    };
    
    return (
        <div className="mb-8 flex justify-center items-center bg-white dark:bg-gray-800 p-2 rounded-xl shadow-md">
            <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                {layouts.map(layout => (
                    <button 
                        key={layout}
                        onClick={() => setActiveLayout(layout)}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${activeLayout === layout ? 'bg-indigo-600 text-white' : ''}`}
                    >
                        {layoutNames[layout]}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- Layout 1: Card Layout Component ---
const CardLayout = ({profile}) => (
    <div className="max-w-1xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <img className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover shadow-md border-4 border-white dark:border-gray-700" src={profile.imagePreview1} alt="Profile Picture" />
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{profile.name1}</h1>
                        <p className="text-md text-indigo-500 dark:text-indigo-400 font-semibold">{profile.membertype}  Member</p>
                    </div>
                </div>
            </div>
            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact items */}
                    <ContactItem icon="fas fa-briefcase" label="Business Name" value={profile.business_name} />
                    <ContactItem icon="fas fa-envelope" label="Email" value={profile.email1} href={`mailto:${UserProfile.email}`} />
                    <ContactItem icon="fas fa-phone" label="Phone Number" value={profile.phone} href={`tel:${UserProfile.phone}`} />
                    <ContactItem icon="fas fa-globe" label="Website" value={profile.website} href={UserProfile.websiteUrl} isExternal />
                    <div className="md:col-span-2">
                        <ContactItem icon="fab fa-linkedin" label="LinkedIn" value={profile.linkedin} href={UserProfile.linkedinUrl} isExternal />
                    </div>
                </div>
            </div>
            <AboutSection profile={profile}/>
            <Gallery profile={profile}/>
        </div>
    </div>
);

const ContactItem = ({ icon, label, value, href, isExternal = false }) => (
    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <Icon className={`${icon} text-indigo-500 text-xl w-6 text-center`} />
        <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{label}</h3>
            {href ? (
                <a 
                    href={href} 
                    {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                    {value}
                </a>
            ) : (
                <p className="text-gray-900 dark:text-white">{value}</p>
            )}
        </div>
    </div>
);

// --- Layout 2: Two-Column Layout Component ---
const TwoColumnLayout = ({profile}) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                <img className="h-32 w-32 rounded-full object-cover shadow-md border-4 border-white dark:border-gray-700 mx-auto -mt-20" src={profile.imagePreview1} alt="Profile Picture" />
                <h1 className="text-2xl mt-4 font-bold text-gray-900 dark:text-white">{profile.name1}</h1>
                <p className="text-md text-indigo-500 dark:text-indigo-400 font-semibold">{profile.membertype} Member</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contact Details</h2>
                <ContactItemVertical icon="fas fa-briefcase" label="Business Name" value={profile.business_name} />
                <ContactItemVertical icon="fas fa-envelope" label="Email" value={profile.email1} href={`mailto:${UserProfile.email}`} />
                <ContactItemVertical icon="fas fa-phone" label="Phone" value={profile.phone} href={`tel:${UserProfile.phone}`} />
                <ContactItemVertical icon="fas fa-globe" label="Website" value={profile.website} href={UserProfile.websiteUrl} isExternal />
                <ContactItemVertical icon="fab fa-linkedin" label="LinkedIn" value={profile.linkedin} href={UserProfile.linkedinUrl} isExternal />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profile.about}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Gallery</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                 {profile.gallery.slice(0, 4).map((photo, index) => (
  <img
    key={index}
    src={`https://tracsdev.apttechsol.com/public/${photo.image}`}
    alt={`Gallery Image ${index + 1}`}
    className="rounded-lg shadow-md w-full h-auto object-cover aspect-square hover:scale-105 transition-transform duration-300"
  />
))}

                </div>
            </div>
        </div>
    </div>
);

const ContactItemVertical = ({ icon, label, value, href, isExternal }) => (
    <div className="flex items-start space-x-3">
        <Icon className={`${icon} text-indigo-500 text-lg w-6 text-center pt-1`} />
        <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{label}</h3>
             {href ? (
                <a href={href} {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })} className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">{value}</a>
            ) : (
                <p className="text-gray-900 dark:text-white">{value}</p>
            )}
        </div>
    </div>
);

// --- Layout 3: Banner Layout Component ---
const BannerLayout = ({profile}) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="h-48 md:h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')" }}></div>
        <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row -mt-24 sm:-mt-20 items-end space-x-6">
                <img className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-800" src={profile.imagePreview1} alt="Profile Picture" />
                <div className="mt-4 sm:mt-0 text-center sm:text-left flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{profile.name1}</h1>
                    <p className="text-md text-indigo-500 dark:text-indigo-400 font-semibold">{profile.membertype} Member</p>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactItem icon="fas fa-briefcase" label="Business Name" value={profile.business_name} />
                <ContactItem icon="fas fa-envelope" label="Email" value={profile.email1} href={`mailto:${UserProfile.email}`} />
                <ContactItem icon="fas fa-phone" label="Phone Number" value={profile.phone} href={`tel:${UserProfile.phone}`} />
                <ContactItem icon="fas fa-globe" label="Website" value={profile.website} href={UserProfile.websiteUrl} isExternal />
                <div className="md:col-span-2">
                     <ContactItem icon="fab fa-linkedin" label="LinkedIn" value={profile.linkedin} href={UserProfile.linkedinUrl} isExternal />
                </div>
            </div>
        </div>
        <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {profile.about.substring(0, 200)}...
            </p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {profile.gallery && profile.gallery.length > 0 ? (
  profile.gallery.map((photo, index) => (
    <img
      key={index}
      src={`https://tracsdev.apttechsol.com/public/${photo.image}`}
      alt={`Gallery Image ${index + 1}`}
      className="rounded-lg shadow-md w-full h-auto object-cover aspect-square hover:scale-105 transition-transform duration-300"
    />
  ))
) : (
  <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
    No gallery images available
  </p>
)}

            </div>
        </div>
    </div>
);

// --- Main App Component ---
export default function Test() {
    const [activeLayout, setActiveLayout] = useState('card');

    const renderLayout = () => {
        switch (activeLayout) {
            case 'two-column':
                return <TwoColumnLayout profile={profile}/>;
            case 'banner':
                return <BannerLayout profile={profile}/>;
            case 'card':
            default:
                return <CardLayout profile={profile}/>;
        }
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
                { icon: 'user', text: 'My Profile', active: true ,to:'/myProfile' },
                { icon: 'lock', text: 'Change Password', to: '/changePassword' },
                { icon: 'link', text: 'Affiliation' },
            ],
        },
        {
            title: 'Introductions',
            links: [
                { icon: 'inbox', text: 'Introduction Messages', to: '/' },
                { icon: 'users', text: 'My Contacts'  , to: '/myContacts'},
                { icon: 'mail', text: 'Email Templates', to: '/emailTemplate' },
                { icon: 'pen-square', text: 'Email Signature', to: '/emailSignature' },
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
        <aside className="bg-[#1a202c] w-64  flex-shrink-0 hidden lg:block h-[100%]">
            <div className="p-6">
                <a href="#" className="text-white text-2xl font-bold">TRACS</a>
            </div>
            <nav className="mt-6">
                {sections.map(section => <SidebarSection key={section.title} {...section} />)}
            </nav>
        </aside>
    );
};
 const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
      const[name,setName]=useState("")   ;
                  const cleanHTML = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, ''); // remove all HTML tags
};
     const [membertype, setMembertype] = useState("");
    const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    about: "",
    imagePreview: "",
    membertype: "",
    gallery: [],
  });
  const fetchProfile = async () => {
    try {
      const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: token },
      });

      const data = response.data;
     
      setName(data.user.name || "");

      setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);

       const name9 = data.user.member_type;
          if (name9 === "1") {
            setMembertype("H7")
          }
          else if (name9 === "2") {
            setMembertype("Tracs")
          }

                setProfile({
        name1: data.user.name || "",
        email1: data.user.email || "",
        phone: data.user.phone || "",
        website: data.user.website || "",
        linkedin: data.user.linkedin || "",
        
        about: cleanHTML(data.user.about || ""),
        imagePreview1: `https://tracsdev.apttechsol.com/public/${data.user.image}`,
        membertype: data.user.member_type === "1" ? "H7" : "Tracs",
        gallery: data.total_photos || [],
        business_name: data.user.business_name || "",
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

    return (
        <div style={{display:"flex"}}><div ><Sidebar /></div>
        <div style={{width:"100%"}}>
            <div>   <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                      <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 lg:hidden">
                          <Icon name="menu" className="w-6 h-6" />
                      </button>
                      <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0"></h1>
                  </div>

                  <div className="flex items-center space-x-4">
                     
                      <div className="relative">
                          <button className="flex items-center space-x-2">
                              <img src={imagePreview} alt="User Avatar" className="h-10 w-10 rounded-full" />
                              <span className="hidden md:block">{name}</span>
                              <Icon name="chevron-down" className="w-4 h-4" />
                          </button>
                      </div>
                  </div>
              </header></div>
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans" style={{width:"100%"}}>
             {/* In a real React project, Google Fonts and Font Awesome would be included 
                in your main `index.html` file or imported in your main CSS file.
            */}
            <div className="container mx-auto p-4 md:p-8 max-w-1xl">
                <LayoutSwitcher activeLayout={activeLayout} setActiveLayout={setActiveLayout} />
                {renderLayout()}
            </div>
        </div></div></div>
    );
}
