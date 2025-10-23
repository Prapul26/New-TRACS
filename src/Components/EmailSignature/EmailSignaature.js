import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
  setLoading(true);
  try {
    await axios.post("https://tracsdev.apttechsol.com/api/signature_store_form", {
      name: signature,
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
        const token =  "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
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

    return (
        <div className="bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-4xl">

                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Email Signature</h1>
                    <p className="text-gray-600 mt-1">Create and manage your professional email signature.</p>
                </header>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

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
                        <div className="flex flex-col">
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
                        </div>
                    </div>
                </div>

                {/* Success Message Toast */}
                <div className={`fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl transition-all duration-300 ease-out ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Signature saved successfully!
                </div>
            </div>
        </div>
    );
}
