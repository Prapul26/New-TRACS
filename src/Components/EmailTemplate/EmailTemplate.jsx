import axios from 'axios';
import React, { useEffect, useState } from 'react';

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


    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
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
        </div>
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
