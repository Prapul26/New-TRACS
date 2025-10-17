import React, { useEffect, useState } from 'react'
import "./ReplyMessage.css"
const ReplyMessage = () => {

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
    return (
        <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
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
    );
}

export default ReplyMessage
