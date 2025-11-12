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





// --- Main App Component ---
export default function Test() {
    const [activeLayout, setActiveLayout] = useState('card');

    const renderLayout = () => {
    
                return <CardLayout profile={profile}/>;
        
    };
 









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
        <div style={{display:"flex"}}><div ></div>
        <div style={{width:"100%"}}>
            <div>  </div>
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans" style={{width:"100%"}}>
             {/* In a real React project, Google Fonts and Font Awesome would be included 
                in your main `index.html` file or imported in your main CSS file.
            */}
            <div className="container mx-auto p-4 md:p-8 max-w-1xl">
               
                {renderLayout()}
            </div>
        </div></div></div>
    );
}
