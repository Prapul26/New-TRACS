import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

// Icon components to replace lucide icons
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
                { icon: 'user', text: 'My Profile', active: true },
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






  const FormInput = memo(({ label, id, type = "text", value, required = false, readOnly = false, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${readOnly ? 'bg-gray-100' : ''}`}
    />
  </div>
));
const FormSelect = memo(({ label, id, value, onChange, required = false, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="">Select {label}</option>
      {children}
    </select>
  </div>
));

const FormTextarea = memo(({ label, id, value, rows = 6, onChange }) => (
  <div className="md:col-span-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    ></textarea>
  </div>
));



export default function MyProfile() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
   const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDiscription, setBusinessDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [addImg, setAddImg] = useState([])
  const [memberType, setMemberType] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [states, setStates] = useState([]);
  const[name,setName]=useState("")
 const [totalPhotos, setTotalPhotos] = useState([]);
  const [files, setFiles] = useState([null]); // start with one file input
  const [previews, setPreviews] = useState([null]); // previews for selected files
  const [images, setImages] = useState([

  ]);
  const [messageType, setMessageType] = useState(""); 

// "success" | "error"

  const fetchProfile = async () => {
    try {
      const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: token },
      });

      const data = response.data;
        if (data.user?.id) {
            localStorage.setItem("userId", data.user.id);
          }

      if (data.user?.id) sessionStorage.setItem("userId", data.user.id);

      setName(data.user.name || "");
      setFirstName(data.user.name?.split(" ")[0] || "");
      setLastName(data.user.name?.split(" ").slice(1).join(" ") || "");
      setEmail(data.user.email || "");
      setPhone(data.user.phone || "");
      const cleanHTML = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, ''); // remove all HTML tags
};

// inside your fetchProfile:
setAbout(cleanHTML(data.user.about || ""));

      setCity(data.user.city || "");
      setState(data.user.state || "");
      setCountry(data.user.country || "");
      setAddress(data.user.address || "");
      setBusinessName(data.user.business_name || "");
      setBusinessDescription(data.user.business_description || "");
      setWebsite(data.user.website || "");
      setLinkedIn(data.user.linkedin || "");
      setStates(data.states || []);
      setMemberType(data.user.member_type || "");
      setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);

      const fullImageUrls = (data.total_photos || []).map(img => ({
        id: img.id,
        url: `https://tracsdev.apttechsol.com/public/${img.image}`,
      }));
      setImages(fullImageUrls);
      setTotalPhotos(data.total_photos || []);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []); // ✅ runs only once when component mounts

 const adjustInternalHtml = (html) => {
  const container = document.createElement("div");
  container.innerHTML = html;
  return container.innerHTML;
};
  // A simple way to inject global styles
  const GlobalStyles = () => (
    <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f7fafc;
        }
    `}</style>
  );
 const ProfileImageUpload = () => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
    <hr className="mt-2 mb-6" />
    <div className="flex flex-col items-center">
      <img
        src={imagePreview}
        alt="Profile"
        className="rounded-lg object-cover w-48 h-48"
      />
      <label
        htmlFor="profile-picture-upload"
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold text-sm mt-4 cursor-pointer"
      >
        Upload Image
      </label>
      <input
        type="file"
        id="profile-picture-upload"
        className="hidden"
        onChange={handleProfileImageChange}
      />
    </div>
  </div>
);

const AdditionalImageUpload = () => (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-gray-900">Additional Images</h3>
    <hr className="mt-2 mb-6" />
    <div className="grid grid-cols-2 gap-4">

      {/* Existing images from API */}
      {totalPhotos.length > 0 && totalPhotos.map((photo) => (
        <img
          key={photo.id}
          src={`https://tracsdev.apttechsol.com/public/${photo.image}`}
          className="rounded-lg h-full w-full object-cover"
          alt=""
        />
      ))}

      {/* Newly added images (local previews) */}
      {addImg.length > 0 && addImg.map((file, index) => (
        <img
          key={`new-${index}`}
          src={URL.createObjectURL(file)}
          className="rounded-lg h-full w-full object-cover"
          alt="Preview"
        />
      ))}

      {/* Upload button */}
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
        <label htmlFor="additional-images-upload" className="flex flex-col items-center p-4 text-gray-500">
          <Icon name="plus" className="w-8 h-8" />
          <span className="text-sm mt-1">Add Image</span>
        </label>
        <input
          type="file"
          id="additional-images-upload"
          className="hidden"
          multiple
          onChange={handleAdditionalImageChange}
        />
      </div>
    </div>
  </div>
);


const handleProfileImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  }
};

const handleAdditionalImageChange = (e) => {
 
  const files = Array.from(e.target.files);
  setAddImg((prev) => [...prev, ...files]);
};

const handleUpdateProfile = async (e) => {
  e.preventDefault();
  setIsUpdating(true);

  try {
    const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("about", about);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("address", address);
    formData.append("linkedin", linkedIn);
    formData.append("business_name", businessName);
    formData.append("business_description", businessDiscription);
    formData.append("website", website);
  formData.append("image", selectedFile); 


    
    // ✅ Append additional images
    addImg.forEach((img, index) => {
      formData.append("photo_list[]", img);
    });
       

    const response = await axios.post(
         "https://tracsdev.apttechsol.com/api/update-profile",
      formData,
      {
        headers: {
          Authorization: token,
       
        },
      }
    );
console.log("FormData entries:", [...formData.entries()]);

    console.log("✅ Profile updated successfully:", response.data);
    setMessageType("success");
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    setMessageType("error");
  } finally {
    setIsUpdating(false);
  }
};

  return (
    <>
      <GlobalStyles />
      <div className="flex  bg-gray-100">
          <Sidebar />

          {/* Main content */}
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">
              <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                      <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 lg:hidden">
                          <Icon name="menu" className="w-6 h-6" />
                      </button>
                      <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0">Edit Profile</h1>
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

              <main className="p-4 md:p-8">
                  <div className="bg-white rounded-lg shadow p-6 md:p-8">
                      <form onSubmit={handleUpdateProfile}>
                          <div className="flex flex-col lg:flex-row gap-8">
                              {/* Left Side: Form */}
                              <div className="w-full lg:w-2/3 space-y-8">
                                  {/* Personal Information Section */}
                                  <div>
                                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                      <hr className="mt-2 mb-6" />
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <FormInput label="First Name" id="first-name" value={firstName}  required  onChange={(e) => setFirstName(e.target.value)}/>
                                          <FormInput label="Last Name" id="last-name" value={lastName} required   onChange={(e) => setLastName(e.target.value)}/>
                                          <FormInput label="Email" id="email" type="email" value={email} required readOnly  onChange={(e) => setEmail(e.target.value)} />
                                          <FormInput label="Phone" id="phone" type="tel" value={phone} required   onChange={(e) => setPhone(e.target.value)}/>
                                      </div>
                                  </div>

                                  {/* Business Details Section */}
                                   <div>
                                      <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
                                      <hr className="mt-2 mb-6" />
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                          <FormInput label="Business Name" id="business-name" value={businessName}  onChange={(e) => setBusinessName(e.target.value)} />
                                        </div>
                                          <FormTextarea label="Business Description/About" id="business-description" value={about}  onChange={(e) => setAbout(e.target.value)} />
                                      </div>
                                  </div>

                                  {/* Contact & Location Section */}
                                  <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Contact & Location</h3>
                                    <hr className="mt-2 mb-6" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput label="Website" id="website" value={website}  onChange={(e) => setWebsite(e.target.value)}/>
                                        <FormInput label="Linkedin" id="linkedin" value={linkedIn}  onChange={(e) => setLinkedIn(e.target.value)}/>
                                        <div className="md:col-span-2">
                                            <FormInput label="Address" id="address" value={address}  onChange={(e) => setAddress(e.target.value)}/>
                                        </div>
                                        <FormSelect label="Country" id="country"  value={country} onChange={(e) => setCountry(e.target.value)} required>
                                            <option value="USA">USA</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Mexico">Mexico</option>
                                        </FormSelect>
                                        <FormInput label="City" id="city" value={city}  onChange={(e) => setCity(e.target.value)}/>
                                        <FormSelect label="State" id="state" value={state}   onChange={(e) => setState(e.target.value)} >
                                           {states.map((s) => (
                                <option key={s.id} value={s.code}>
                                  {s.name}
                                </option>
                              ))}
                                        </FormSelect>
                                    </div>
                                </div>
                              </div>
                              {/* Right Side: Profile Media */}
                              <div className="w-full lg:w-1/3">
                                  <ProfileImageUpload />
<AdditionalImageUpload totalPhotos={totalPhotos} />

                              </div>
                          </div>

                          <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3">
                              <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-semibold text-sm">Cancel</button>
                              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold text-sm">Update Profile</button>
                          </div>
                      </form>
                  </div>
              </main>
          </div>
      </div>
    </>
  );
}

