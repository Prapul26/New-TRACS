import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// --- Main App Component ---
export default function EmailTemplate() {
    // State to manage which view is currently visible ('list' or 'add')
    const [view, setView] = useState('list');

    // State to hold the list of email templates
    const [templates, setTemplates] = useState([

    ]);
    useEffect(() => {
        let isCalled = false;
        const fetchTemplates = async () => {
            if (isCalled) return;
            isCalled = true;

            const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
            try {
                const response = await axios.get(`https://tracsdev.apttechsol.com/api/view-template-list`, {
                    headers: {
                        Authorization: token,
                    },
                });

                const fetchedTemplates = response.data.templates.data;
                setTemplates(fetchedTemplates);

                const initialStatuses = {};
                fetchedTemplates.forEach((template) => {
                    initialStatuses[template.id] = template.status === "1";
                });

            } catch (err) {
                console.log(err.response?.data?.message || "Failed to fetch templates.");
            }
        };

        fetchTemplates();
    }, []);

    // Function to toggle the status of a template
    // Function to toggle the status of a template
    const handleStatusToggle = (id) => {
        setTemplates((prevTemplates) =>
            prevTemplates.map((template) =>
                template.id === id
                    ? {
                        ...template,
                        status: template.status === "1" ? "0" : "1", // toggle between "1" and "0"
                    }
                    : template
            )
        );
    };

 const handleDelete = async (id) => {
    const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

    try {
      await axios.get(
        `https://tracsdev.apttechsol.com/api/destroy-template/${id}`,

        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedTemplates = templates.filter((template) => template.id !== id);
      setTemplates(updatedTemplates);
     

    } catch (err) {
      console.error("Delete failed:", err);

  
    }
  };

    // Function to handle form submission (for now, it just logs to console and switches view)
    const handleAddTemplate = (e) => {
        e.preventDefault();
        // In a real app, you would process form data here
        console.log("New template saved!");
        setView('list'); // Switch back to the list view
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
                { icon: 'credit-card', text: 'My Membership', to: '/myMembership' },
        { icon: 'user', text: 'My Profile', to: '/myProfile' },
        { icon: 'lock', text: 'Change Password', to: '/changePassword'  },
        { icon: 'link', text: 'Affiliation' },
            ],
        },
        {
            title: 'Introductions',
            links: [
                { icon: 'inbox', text: 'Introduction Messages', to: '/' },
                { icon: 'users', text: 'My Contacts', to: '/myContacts'  },
                { icon: 'mail', text: 'Email Templates', active: true  },
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


    return (
        <div style={{display:'flex'}}><div><Sidebar /></div>
        <div className="bg-gray-50 text-gray-800 font-sans" style={{width:"100%"}}>
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                {view === 'list' ? (
                    <TemplateListView
                        templates={templates}
                        onAddNew={() => setView('add')}
                        onStatusToggle={handleStatusToggle}
                         onDelete={handleDelete}
                    />
                ) : (
                    <AddTemplateFormView
                        onBack={() => setView('list')}
                        onCancel={() => setView('list')}
                        onSubmit={handleAddTemplate}
                    />
                )}
            </div>
        </div></div>
    );
}

// --- Template List View Component ---
const TemplateListView = ({ templates, onAddNew, onStatusToggle , onDelete}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
                <button onClick={onAddNew} className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                    Add New Template
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated On</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {templates.map(template => (
                            <tr key={template.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.template_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.category_id === "5" ? "Reply-Email" : template.category_id === "1" ? "Introduction-Email" : template.category_id === "2" ? "Bump" : template.category_id === "3" ? "Follow-up" : template.category_id === "4" ? "Member-Email" : template.category_id?.toString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{template.email_body}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.created_at}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            onClick={() => onStatusToggle(template.id)}
                                            className={`cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${template.status === "1"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {template.status === "1" ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-900">Edit</a>
                                    <a href="#" className="text-red-600 hover:text-red-900 ml-4" onClick={() => onDelete(template.id)}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Add Template Form View Component ---
const AddTemplateFormView = ({ onBack, onCancel, onSubmit }) => {
  const [adminTemplates, setAdminTemplates] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [adminTemplate, setAdminTemplate] = useState("");

  useEffect(() => {
    const fetchAdminTemplates = async () => {
      const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
      try {
        const response = await axios.get(
          "https://tracsdev.apttechsol.com/api/create-template",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setAdminTemplates(response.data.admintemplates || []);
      } catch (err) {
        console.error("Error fetching admin templates:", err);
      }
    };

    fetchAdminTemplates();
  }, []);

  // ✅ FIXED async handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !description || !adminTemplate) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", category);
    formData.append("admin_template_id", adminTemplate);
    formData.append("description", description);

    const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

    try {
      const response = await axios.post(
        "https://tracsdev.apttechsol.com/api/store-template",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(response.data.message || "Template added successfully!");
      onBack(); // Go back to the list view after success
    window.location.reload()
    } catch (error) {
      console.log(error.response?.data?.message || "Error adding the Template");
      alert("Error adding the Template");
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Template</h1>
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          &larr; Back to list
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Welcome Email"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a category</option>
              <option value="1">Introduction-Email</option>
              <option value="2">Bump</option>
              <option value="3">Follow Up</option>
              <option value="4">Member-Email</option>
              <option value="5">Reply-Email</option>
            </select>
          </div>

          {/* Admin Templates */}
          <div>
            <label
              htmlFor="admin-templates"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Templates <span className="text-red-500">*</span>
            </label>
            <select
              id="admin-templates"
              value={adminTemplate}
              onChange={(e) => {
                const selectedId = e.target.value;
                setAdminTemplate(selectedId);
                const selectedTemplate = adminTemplates.find(
                  (t) => t.id === parseInt(selectedId)
                );
                if (selectedTemplate) {
                  setDescription(selectedTemplate.email_body);
                }
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select an Admin Template</option>
              {adminTemplates.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.template_name}
                </option>
              ))}
            </select>
          </div>

          {/* Email Body */}
          <div>
            <label
              htmlFor="email-body"
              className="block text-sm font-medium text-gray-700"
            >
              Email Body <span className="text-red-500">*</span>
            </label>
            <textarea
              id="email-body"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="10"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email content here"
              required
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save Template
          </button>
        </div>
      </form>
    </div>
  );
};
