import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './ChangePassword.css'

// Reusable Eye Icon Component
const EyeIcon = ({
    onClick,
    isVisible
}) => (
    <span className="toggle-password text-gray-500" onClick={onClick} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
        {isVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.9 9.9 4.2 4.2" /><path d="m14.1 14.1 5.7 5.7" /><path d="M12 18a6 6 0 0 0 6-6h-4c0 1.1-.9 2-2 2v4Z" /><path d="M12 6.5A6.5 6.5 0 0 1 18 12a6.5 6.5 0 0 1-6.5 6.5" /><path d="m2 2 20 20" /></svg>
        )}
    </span>
);




export default function ChangePassword() {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [name, setName] = useState("")


    const fetchProfile = async () => {
        try {
            const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
            const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
                headers: { Authorization: token },
            });

            const data = response.data;

            setName(data.user.name || "");

            setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);


        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    // State management for form fields and UI
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for password visibility
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // State for validation and feedback messages
    const [message, setMessage] = useState({ text: '', type: '' });
    const [passwordStrength, setPasswordStrength] = useState({ text: '', color: '' });
    const [matchStatus, setMatchStatus] = useState({ text: '', color: '' });

    // Effect to check password strength as new password changes
    useEffect(() => {
        if (!newPassword) {
            setPasswordStrength({ text: '', color: '' });
            return;
        }
        if (newPassword.length < 8) {
            setPasswordStrength({ text: 'Weak: Too short', color: 'text-red-600' });
        } else if (newPassword.length < 12) {
            setPasswordStrength({ text: 'Medium: Good length', color: 'text-yellow-600' });
        } else {
            setPasswordStrength({ text: 'Strong: Excellent length', color: 'text-green-600' });
        }
    }, [newPassword]);

    // Effect to check if new and confirm passwords match
    useEffect(() => {
        if (!confirmPassword) {
            setMatchStatus({ text: '', color: '' });
            return;
        }
        if (newPassword === confirmPassword) {
            setMatchStatus({ text: 'Passwords match!', color: 'text-green-600' });
        } else {
            setMatchStatus({ text: 'Passwords do not match.', color: 'text-red-600' });
        }
    }, [newPassword, confirmPassword]);



    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (newPassword.length < 8) {
            setMessage({ text: 'New password must be at least 8 characters long.', type: 'error' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ text: 'New passwords do not match.', type: 'error' });
            return;
        }

        try {
            const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1"; // or sessionStorage if used there

            const response = await axios.post(
                'https://tracsdev.apttechsol.com/api/update-password',
                {
                    current_password: currentPassword,
                    password: newPassword,
                    password_confirmation: confirmPassword
                },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.status === true) {
                setMessage({ text: response.data.message || 'Password updated successfully!', type: 'success' });
                handleCancel();
            } else {
                setMessage({ text: response.data.message || 'Failed to update password.', type: 'error' });
            }
        } catch (error) {
            console.error('Error updating password:', error);
            if (error.response?.data?.message) {
                setMessage({ text: error.response.data.message, type: 'error' });
            } else {
                setMessage({ text: 'An unexpected error occurred. Please try again.', type: 'error' });
            }
        }

        // Hide message after 5s
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };
    // Handler to reset the form state
    const handleCancel = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage({ text: '', type: '' });
        setIsCurrentPasswordVisible(false);
        setIsNewPasswordVisible(false);
        setIsConfirmPasswordVisible(false);
    };

    // Dynamic border color for the confirm password input
    const confirmPasswordBorderColor = () => {
        if (!confirmPassword) return 'border-gray-300';
        return newPassword === confirmPassword ? 'border-green-500' : 'border-red-500';
    };
    const GlobalStyles = () => (
        <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f7fafc;
        }
    `}</style>
    );

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
                    { icon: 'lock', text: 'Change Password', active: true },
                    { icon: 'link', text: 'Affiliation' },
                ],
            },
            {
                title: 'Introductions',
                links: [
                    { icon: 'inbox', text: 'Introduction Messages', to: '/' },
                    { icon: 'users', text: 'My Contacts', to: '/myContacts' },
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



    return (
        <div style={{ display: "flex" }}><div><Sidebar /></div>
        <div style={{width:"100%"}}><header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 lg:hidden">
                            <Icon name="menu" className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0"></h1>
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
            <div className="bg-gray-50 text-gray-800 font-sans p-1 sm:p-6 lg:p-8" style={{ width: "100%" }}>
                <div >
                        <h1 className="text-3xl font-bold text-gray-800">Change Password</h1>
                        <p className="text-gray-500 mt-2">Update your password for enhanced security.</p>
                    </div>
                <div className="container mx-auto max-w-1xl mt-6 bg-white p-8 rounded-2xl shadow-lg">

                    

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Password */}
                        <div>
                            <label htmlFor="current-password" className="text-sm font-medium text-gray-700">Current Password</label>
                            <div className="mt-1" style={{ position: 'relative' }}>
                                <input
                                    id="current-password"
                                    type={isCurrentPasswordVisible ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <EyeIcon onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)} isVisible={!isCurrentPasswordVisible} />
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="new-password" className="text-sm font-medium text-gray-700">New Password</label>
                            <div className="mt-1" style={{ position: 'relative' }}>
                                <input
                                    id="new-password"
                                    type={isNewPasswordVisible ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <EyeIcon onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)} isVisible={!isNewPasswordVisible} />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Password must be at least 8 characters long (12+ recommended).</p>
                            {passwordStrength.text && <p className={`mt-2 text-xs ${passwordStrength.color}`}>Strength: {passwordStrength.text}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirm New Password</label>
                            <div className="mt-1" style={{ position: 'relative' }}>
                                <input
                                    id="confirm-password"
                                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${confirmPasswordBorderColor()}`}
                                />
                                <EyeIcon onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} isVisible={!isConfirmPasswordVisible} />
                            </div>
                            {matchStatus.text && <p className={`mt-2 text-xs ${matchStatus.color}`}>{matchStatus.text}</p>}
                        </div>

                        {/* Message Box */}
                        {message.text && (
                            <div className={`p-4 rounded-md text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message.text}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-4">
                            <button type="button" onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div></div>
    );
}
