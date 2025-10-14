import React, { useEffect, useState } from 'react'
import "./ReplyMessage.css"
const ReplyMessage = () => {

    // Mock data - in a real app, this would come from an API

    const [recipients, setRecipients] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState('');
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [includeSignature, setIncludeSignature] = useState(true);
    const [previousMessages, setPreviousMessages] = useState([]);

    // Mock data - in a real app, this would come from an API
    useEffect(() => {
        // Set mock recipients
        setRecipients([
            { id: '1', name: 'John Doe', email: 'john@example.com' },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
            { id: '3', name: 'Support Team', email: 'support@example.com' }
        ]);

        // Set mock templates
        setTemplates([
            { id: '1', name: 'Standard Reply', content: 'Thank you for your message. We will get back to you soon.' },
            { id: '2', name: 'Follow-up', content: 'Just following up on our previous conversation...' },
            { id: '3', name: 'Technical Support', content: 'Our technical team is looking into your issue.' }
        ]);

        // Set mock previous messages
        setPreviousMessages([
            { id: '1', sender: 'John Doe', date: '2023-05-15', content: 'Hello, I have a question about your product.' },
            { id: '2', sender: 'You', date: '2023-05-16', content: 'Thank you for reaching out. How can we help?' },
            { id: '3', sender: 'John Doe', date: '2023-05-17', content: 'I need help with the installation process.' }
        ]);
    }, []);

    // Handle template selection and populate message body
    const handleTemplateChange = (e) => {
        const templateId = e.target.value;
        setSelectedTemplate(templateId);
        const template = templates.find(t => t.id === templateId);
        if (template) {
            setMessageBody(template.content);
        }
    };

    // Handle form submission
    const handleSend = () => {
        // In a real app, this would send the message to an API
        console.log('Message sent to:', selectedRecipient);
        console.log('Message content:', messageBody);
        console.log('Include signature:', includeSignature);
        alert('Message sent successfully!');
    };

    // Handle cancel action
    const handleCancel = () => {
        // Reset form or navigate away
        setMessageBody('');
        setSelectedTemplate('');
        console.log('Reply cancelled');
    };

    // Handle creating a new template
    const handleCreateTemplate = () => {
        const templateName = prompt('Enter a name for your new template:');
        if (templateName) {
            const newTemplate = {
                id: Date.now().toString(),
                name: templateName,
                content: messageBody || 'New template content'
            };
            setTemplates([...templates, newTemplate]);
            alert(`Template "${templateName}" created!`);
        }
    };
    return (
        <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Reply to Message</h1>

                {/* Single Column Layout */}
                <div className="space-y-8">
                    {/* Reply Composer */}
                    <div className="bg-white p-6 rounded-xl message-box-shadow">
                        {/* 1. Selectable Recipients */}
                        <div className="mb-6 pb-4 border-b">
                            <div className="flex flex-col md:flex-row md:items-center justify-start space-y-2 md:space-y-0 md:space-x-4">
                                <label htmlFor="recipient-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                    Send this reply to:
                                </label>
                                <select
                                    id="recipient-select"
                                    value={selectedRecipient}
                                    onChange={(e) => setSelectedRecipient(e.target.value)}
                                    className="w-full md:max-w-xs p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                >
                                    <option value="">Select a recipient</option>
                                    {recipients.map((recipient) => (
                                        <option key={recipient.id} value={recipient.email}>
                                            {recipient.name} ({recipient.email})
                                        </option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-500 italic hidden md:block">(Excluding yourself)</span>
                            </div>
                        </div>

                        {/* 2. Email Template Selection & Creation */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-3 md:space-y-0">
                            <label htmlFor="template-select" className="text-sm font-medium text-gray-700 w-full md:w-auto">
                                Select Template:
                            </label>
                            <select
                                id="template-select"
                                value={selectedTemplate}
                                onChange={handleTemplateChange}
                                className="flex-grow md:max-w-xs p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            >
                                <option value="">Select a template</option>
                                {templates.map((template) => (
                                    <option key={template.id} value={template.id}>
                                        {template.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleCreateTemplate}
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
                                onClick={handleCancel}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition duration-200 shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSend}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-200"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>

                    {/* 6. Previous Messages List */}
                    <div className="bg-white p-6 rounded-xl message-box-shadow">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Previous Messages</h2>
                        <div
                            id="message-history"
                            className="space-y-4 overflow-y-auto max-h-96 pr-2"
                        >
                            {previousMessages.map(message => (
                                <div key={message.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-gray-800">{message.sender}</p>
                                            <p className="text-sm text-gray-500">{message.date}</p>
                                        </div>
                                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">{message.subject}</span>
                                    </div>
                                    <p className="mt-2 text-gray-700 whitespace-pre-line">{message.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
        #message-history::-webkit-scrollbar {
          width: 6px;
        }
        #message-history::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 3px;
        }
        .message-box-shadow {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
        </div>
    )
}

export default ReplyMessage
