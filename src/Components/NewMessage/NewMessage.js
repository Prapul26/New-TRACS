import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./NewMessage.css"
import { FaPlus } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io';
import { TiArrowBack } from "react-icons/ti";
import { GrFormView } from "react-icons/gr";
import { FaArchive } from "react-icons/fa";
import { Link } from 'react-router-dom';
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
        { icon: 'credit-card', text: 'My Membership', to: '/myMembership', to: '/myMembership' },
        { icon: 'user', text: 'My Profile', to: '/myProfile' , to: '/myProfile'},
        { icon: 'lock', text: 'Change Password', to: '/changePassword' , to: '/changePassword' },
        { icon: 'link', text: 'Affiliation' },
      ],
    },
    {
      title: 'Introductions',
      links: [
        { icon: 'inbox', text: 'Introduction Messages', active: true },
        { icon: 'users', text: 'My Contacts' , to: '/myContacts'},
        { icon: 'mail', text: 'Email Templates' , to: '/emailTemplate'},
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



const NewMessage = () => {
    const [showFolloup, setFollowUp] = useState(false);
    const [showShortBy, setShortBy] = useState(false);
    const HandleFollowUp = () => {
        setFollowUp((prev) => !prev);
    };
    const handleShortBy = () => {
        setShortBy((prev) => !prev);
    };

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

    return (
        <div style={{display:'flex'}}><div ><Sidebar /></div>
        <div style={{ background: "#f4f7f9",width:"100%" }}>
               <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 lg:hidden">
              <Icon name="menu" className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0"></h1>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
              View Profile
            </a>
            <div className="relative">
              <button className="flex items-center space-x-2">
                <img src={imagePreview} alt="User Avatar" className="h-10 w-10 rounded-full" />
                <span className="hidden md:block">{name}</span>
                <Icon name="chevron-down" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
            <div className='newMessageContainer'>
                <div className='nmheading'>
                    <div className='nmheading1'>
                        <div><h1>Messages</h1></div>
                        <div><p>Your conversations with members</p></div>
                    </div>
                    <div className='nmheading2'><Link to="/makeIntroduction" style={{textDecoration:"nnoe",color:"inherit"}}> <button><div style={{marginTop:"3px"}}><FaPlus /></div>Make A Introduction</button></Link> </div>
                </div>
                <div className='filter'>
                    <div className='status'><label>Status :</label><div><div className='status1' onClick={HandleFollowUp}><strong>All Introductions</strong> <div style={{marginTop:"3px"}}><IoIosArrowDown /></div></div>
                        {showFolloup && <div className='showFolloup'>
                            <div className='showFolloup1'>All Introductions</div>
                            <div className='showFolloup1'>Need Follow-Up</div>
                            <div className='showFolloup1'>Messages Sent</div>
                            <div className='showFolloup1'>Messages Received</div>
                        </div>}</div></div>
                    <div className='shortby'><label>Sort By :</label><div><div className='shortby1' onClick={handleShortBy}><strong>Oldest</strong> <div style={{marginTop:"3px"}}><IoIosArrowDown /></div></div>
                        {showShortBy && <div className='showShortBy'>
                            <div className='showShortBy1'>Latest</div>
                            <div className='showShortBy1'>Oldest</div>
                        </div>}</div></div>
                    <div className='filterSearch'><input placeholder='Search introductions or members.....' /></div>
                </div>
                <div className='cardContainer1'>
                    <Link to="/replyMessage"><div className='cardHolderDetails'>
                        <div className='cardmemberDetails'>
                            <div className='cardmemberDetails1'>
                                <div><img src='https://i.pravatar.cc/40?img=1' /></div>
                                <div><h3>S Kumar Nelli</h3></div>
                                <div style={{ marginTop: "8px" }}><strong>1 day ago</strong></div>
                                <div className='statusFF' style={{ marginTop: "8px" }}><strong>Needs Follow-up</strong></div>
                            </div>
                            <div className='cardmemberDetails2'>
                                <div><h2>Shankar Vanga <span style={{ marginLeft: "6px", marginRight: "6px", color: "#999" }}>&</span>  Tracs Member</h2></div>
                            </div>
                            <div className='cardmemberDetails3'>
                              <div style={{display:"flex"}}>
                                <div><img src="https://i.pravatar.cc/35?img=15" /></div>
                                <div><div><p>Shankar Vanga</p></div>
                                    <div style={{ marginTop: "-5px" }}><strong>0 Replies</strong></div>
                                </div>
                                </div>

                              <div style={{display:"flex"}}> <div><img src="https://i.pravatar.cc/35?img=22" /></div>
                                <div><div><p>Tracs Member</p></div>
                                    <div style={{ marginTop: "-5px" }}><strong>0 Replies</strong></div>
                                </div></div> 

                            </div>
                            <div className='ojnhgtr'><h3>Latest Message:</h3></div>
                            <div className='cardmemberDetails4'>
                                <div><img src='https://i.pravatar.cc/40?img=1' /></div>
                                <div><h3>S Kumar Nelli</h3></div>
                                <div style={{ marginTop: "-4px" }}><strong>(1 day ago)</strong></div>

                            </div>
                            <div className='cardmemberDetails5'>
                                <p>Hi Tracs Member, I'd like to introduce you to Shankar Vanga, who I believe could be a valuable connection for your work in sustainable energy solutions. I thought your expertise in battery technology would perfectly complement his project goals...</p>
                            </div>
                        </div>
                        <div className='cardmembersbuttons'>
                            <div><button style={{ background: "#007bff",color:"white" }}> <div><TiArrowBack size={19} /></div>Reply</button></div>
                            <div><button style={{ background: "#e9f5ff", border: "1px solid #007bff", color: "#007bff" }}><div><GrFormView size={20} /></div>View</button></div>
                            <div><button style={{ background: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }}><div style={{marginTop:"3.2px"}}><FaArchive size={15} /></div>Archive</button></div>
                        </div>
                    </div></Link>

                </div>
                <div className='cardContainer2'>
                    <Link to="/replyMessage"><div className='cardHolderDetails'>
                        <div className='cardmemberDetails'>
                            <div className='cardmemberDetails1'>
                                <div><img src='https://i.pravatar.cc/40?img=5' /></div>
                                <div><h3>Mary J.</h3></div>
                                <div style={{ marginTop: "8px" }}><strong>4 day ago</strong></div>
                                <div className='statusFF2' style={{ marginTop: "8px" ,background:"#d4edda",color:"#155724"}}><strong style={{color:"#155724"}}>Conversation Started</strong></div>
                            </div>
                            <div className='cardmemberDetails2'>
                                <div><h2>Kenji T.  <span style={{ marginLeft: "6px", marginRight: "6px", color: "#999" }}>&</span>  Priya S.</h2></div>
                            </div>
                            <div className='cardmemberDetails3'>
                              <div style={{display:"flex"}}>
                                <div><img src="https://i.pravatar.cc/35?img=33" /></div>
                                <div><div><p>Kenji T.</p></div>
                                    <div style={{ marginTop: "-5px" }}><strong>2 Replies</strong></div>
                                </div>
                                </div>

                              <div style={{display:"flex"}}> <div><img src="https://i.pravatar.cc/20?img=49" /></div>
                                <div><div><p>Priya S.</p></div>
                                    <div style={{ marginTop: "-5px" }}><strong>0 Replies</strong></div>
                                </div></div> 

                            </div>
                            <div className='ojnhgtr'><h3>Latest Message:</h3></div>
                            <div className='cardmemberDetails4'>
                                <div><img src='https://i.pravatar.cc/20?img=33' /></div>
                                <div><h3>Kenji T.</h3></div>
                                <div style={{ marginTop: "-4px" }}><strong>(3 hours ago)</strong></div>

                            </div>
                            <div className='cardmemberDetails5'>
                                <p>Kenji, thanks for making the connection, Priya. Looking forward to discussing this further! Please let me know your availability for a quick 15-minute call next week to review the deck.</p>
                            </div>
                        </div>
                        <div className='cardmembersbuttons'>
                            <div><button style={{ background: "#007bff",color:"white" }}> <div><TiArrowBack size={19} /></div>Reply</button></div>
                            <div><button style={{ background: "#e9f5ff", border: "1px solid #007bff", color: "#007bff" }}><div><GrFormView size={20} /></div>View</button></div>
                        </div>
                    </div></Link>

                </div>
                <div className='cardContainer3'>
                    <Link to="/replyMessage"><div className='cardHolderDetails'>
                        <div className='cardmemberDetails'>
                            <div className='cardmemberDetails1'>
                                <div><img src='https://i.pravatar.cc/40?img=12' /></div>
                                <div><h3>David L.</h3></div>
                                <div style={{ marginTop: "8px" }}><strong>3 weeks ago</strong></div>
                                <div className='statusFF3' style={{ marginTop: "8px" }}><strong style={{color:"#1e7e34"}}>Conversation Completed</strong></div>
                            </div>
                            <div className='cardmemberDetails2'>
                                <div><h2>Sarah M. <span style={{ marginLeft: "6px", marginRight: "6px", color: "#999" }}>&</span>  Ben C.</h2></div>
                            </div>
                            <div className='cardmemberDetails3'>
                              <div style={{display:"flex"}}>
                                <div><img src="https://i.pravatar.cc/35?img=10" /></div>
                                <div><div><p>Sarah M.</p></div>
                                    <div style={{ marginTop: "-5px" }}><strong>5 Replies</strong></div>
                                </div>
                                </div>

                              <div style={{display:"flex"}}> <div><img src="https://i.pravatar.cc/35?img=19" /></div>
                                <div><div><p>Ben C.</p></div>
                                    <div style={{ marginTop: "-5px" }}><strong>3 Replies</strong></div>
                                </div></div> 

                            </div>
                            <div className='ojnhgtr'><h3>Latest Message:</h3></div>
                            <div className='cardmemberDetails4'>
                                <div><img src='https://i.pravatar.cc/40?img=12' /></div>
                                <div><h3>David L.</h3></div>
                                <div style={{ marginTop: "-4px" }}><strong>(2 weeks ago)</strong></div>

                            </div>
                            <div className='cardmemberDetails5'>
                                <p>Great! Glad to hear the three of you connected successfully. I'm archiving this thread now. Let me know if anything else comes up. Best, David.</p>
                            </div>
                        </div>
                        <div className='cardmembersbuttons'>
                            <div><button style={{ background: "#e9f5ff", border: "1px solid #007bff", color: "#007bff" }}><div><GrFormView size={20} /></div>View</button></div>
         
                            <div><button style={{ background: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb",width:"130px" }}><div  style={{marginTop:"3.2px"}}><FaArchive size={15} /></div>Re-Archive</button></div>
                        </div>
                    </div></Link>

                </div>
                <div className='cardContainer4'>
                   <Link to="/replyMessage"> <div className='cardHolderDetails'>
                        <div className='cardmemberDetails'>
                            <div className='cardmemberDetails1'>
                                <div><img src='https://i.pravatar.cc/40?img=61' /></div>
                                <div><h3>Alex P.</h3></div>
                                <div style={{ marginTop: "8px" }}><strong>5 minutes ago</strong></div>
                                <div className='statusFF4' style={{ marginTop: "8px" }}><strong style={{color:'#495057'}}>Awating Reply</strong></div>
                            </div>
                            <div className='cardmemberDetails2'>
                                <div><h2>Jenna K. <span style={{ marginLeft: "6px", marginRight: "6px", color: "#999" }}>&</span>  Market Analyst</h2></div>
                            </div>
                            <div className='cardmemberDetails3'>
                              <div style={{display:"flex"}}>
                                <div><img src="https://i.pravatar.cc/35?img=65" /></div>
                                <div><div><p>Jenna K. </p></div>
                                    <div style={{ marginTop: "-5px" }}><strong>0 Replies</strong></div>
                                </div>
                                </div>

                              <div style={{display:"flex"}}> <div><img src="https://i.pravatar.cc/35?img=66" /></div>
                                <div><div><p>Market Analyst</p></div>
                                    <div style={{ marginTop: "-5px" }}><strong>0 Replies</strong></div>
                                </div></div> 

                            </div>
                            <div className='ojnhgtr'><h3>Latest Message:</h3></div>
                            <div className='cardmemberDetails4'>
                                <div><img src='https://i.pravatar.cc/40?img=61' /></div>
                                <div><h3>Alex P.</h3></div>
                                <div style={{ marginTop: "-4px" }}><strong>(5 minutes ago)</strong></div>

                            </div>
                            <div className='cardmemberDetails5'>
                                <p>Jenna, meet our new Market Analyst. I thought they should connect with you directly regarding the Q3 sales projections and budget allocations for the digital advertising campaigns starting next month...</p>
                            </div>
                        </div>
                        <div className='cardmembersbuttons'>
                            <div><button style={{ background: "#007bff",color:"white" }}> <div><TiArrowBack size={19} /></div>Reply</button></div>
                            <div><button style={{ background: "#e9f5ff", border: "1px solid #007bff", color: "#007bff" }}><div><GrFormView size={20} /></div>View</button></div>
                        </div>
                    </div></Link>

                </div>
                </div>
        </div></div>
    )
}

export default NewMessage
