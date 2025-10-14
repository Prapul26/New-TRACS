import React, { useState } from 'react'
import "./NewMessage.css"
import { FaPlus } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io';
import { TiArrowBack } from "react-icons/ti";
import { GrFormView } from "react-icons/gr";
import { FaArchive } from "react-icons/fa";
import { Link } from 'react-router-dom';

const NewMessage = () => {
    const [showFolloup, setFollowUp] = useState(false);
    const [showShortBy, setShortBy] = useState(false);
    const HandleFollowUp = () => {
        setFollowUp((prev) => !prev);
    };
    const handleShortBy = () => {
        setShortBy((prev) => !prev);
    };


    return (
        <div style={{ background: "#f4f7f9" }}>
            <div className='newMessageContainer'>
                <div className='nmheading'>
                    <div className='nmheading1'>
                        <div><h1>Messages</h1></div>
                        <div><p>Your conversations with members</p></div>
                    </div>
                    <div className='nmheading2'><button><Link to="/makeIntroduction"  style={{textDecoration:"nnoe",color:"inherit"}}> <div><FaPlus /></div>Make A Introduction</Link> </button></div>
                </div>
                <div className='filter'>
                    <div className='status'><label>Status :</label><div><div className='status1' onClick={HandleFollowUp}><strong>Need Follow-Up</strong> <div style={{marginTop:"3px"}}><IoIosArrowDown /></div></div>
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
                    <div className='cardHolderDetails'>
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
                                    <div style={{ marginTop: "-15px" }}><strong>0 Replies</strong></div>
                                </div>
                                </div>

                              <div style={{display:"flex"}}> <div><img src="https://i.pravatar.cc/35?img=22" /></div>
                                <div><div><p>Tracs Member</p></div>
                                    <div style={{ marginTop: "-15px" }}><strong>0 Replies</strong></div>
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
                            <div><button style={{ background: "#007bff" }}> <div><TiArrowBack size={19} /></div>Reply</button></div>
                            <div><button style={{ background: "#e9f5ff", border: "1px solid #007bff", color: "#007bff" }}><div><GrFormView size={20} /></div>View</button></div>
                            <div><button style={{ background: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }}><div><FaArchive size={15} /></div>Archive</button></div>
                        </div>
                    </div>

                </div>
                <div className='cardContainer2'>
                    <div className='cardHolderDetails'>
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
                                    <div style={{ marginTop: "-15px" }}><strong>2 Replies</strong></div>
                                </div>
                                </div>

                              <div style={{display:"flex"}}> <div><img src="https://i.pravatar.cc/20?img=49" /></div>
                                <div><div><p>Priya S.</p></div>
                                    <div style={{ marginTop: "-15px" }}><strong>0 Replies</strong></div>
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
                            <div><button style={{ background: "#007bff" }}> <div><TiArrowBack size={19} /></div>Reply</button></div>
                            <div><button style={{ background: "#e9f5ff", border: "1px solid #007bff", color: "#007bff" }}><div><GrFormView size={20} /></div>View</button></div>
                        </div>
                    </div>

                </div>
                <div className='cardContainer3'>
                    <div className='cardHolderDetails'>
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
                                    <div style={{ marginTop: "-15px" }}><strong>5 Replies</strong></div>
                                </div>
                                </div>

                              <div style={{display:"flex"}}> <div><img src="https://i.pravatar.cc/35?img=19" /></div>
                                <div><div><p>Ben C.</p></div>
                                    <div style={{ marginTop: "-15px" }}><strong>3 Replies</strong></div>
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
         
                            <div><button style={{ background: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb",width:"130px" }}><div><FaArchive size={15} /></div>Re-Archive</button></div>
                        </div>
                    </div>

                </div>
                <div className='cardContainer4'>
                    <div className='cardHolderDetails'>
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
                                    <div style={{ marginTop: "-15px" }}><strong>0 Replies</strong></div>
                                </div>
                                </div>

                              <div style={{display:"flex"}}> <div><img src="https://i.pravatar.cc/35?img=66" /></div>
                                <div><div><p>Market Analyst</p></div>
                                    <div style={{ marginTop: "-15px" }}><strong>0 Replies</strong></div>
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
                            <div><button style={{ background: "#007bff" }}> <div><TiArrowBack size={19} /></div>Reply</button></div>
                            <div><button style={{ background: "#e9f5ff", border: "1px solid #007bff", color: "#007bff" }}><div><GrFormView size={20} /></div>View</button></div>
                        </div>
                    </div>

                </div>
                </div>
        </div>
    )
}

export default NewMessage
