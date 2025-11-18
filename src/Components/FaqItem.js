import React from 'react';
import Header from './Heaader/Header';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const FaqIem = () => {
  const faqItems = [
    {
      question: "What does the TRACS application do?",
      answer: (
        <>
          TRACS stands for <strong>Total Relationship Advanced Conversion System</strong>. It is a platform designed to make business networking more effective. It helps professionals to send introductions effectively, track the progress of referrals, and ensure that networking efforts actually lead to "conversions" (real business results) rather than just lost emails.
        </>
      ),
    },
    {
      question: "Why am I receiving a notification from TRACS?",
      answer: (
        <>
          You received this email because a professional contact in your network is using TRACS to send you a formal business introduction. Instead of a standard email that might get lost, they are using our system to ensure this connection is delivered securely to you. You are being invited to connect with a new potential partner, client, or resource.
        </>
      ),
    },
    {
      question: "What is an \"Introduction Message\"?",
      answer: (
        <>
          Think of this as a digital "warm handshake." It is a dedicated communication channel opened by the Introducer to break the ice. The message provides context on who you are, who the other person is, and the specific strategic reason why the Introducer thinks you should meet (e.g., to discuss a specific project or service).
        </>
      ),
    },
    {
      question: "What is the best way to reply?",
      answer: (
        <>
          To ensure everyone stays in the loop, simply click the <strong>"Reply"</strong> button inside the email. This will take you to the secure TRACS messaging page. From there, you can thank the Introducer, greet your new connection, and suggest a time to meet or discuss further.
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
        <Header />
        <Navbar />
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        
        {/* Header */}
        <header className="text-center mb-10 md:mb-16">
          <p className="text-xl text-gray-600 mt-2">Learn More About Our Platform</p>
        </header>

        {/* FAQ Section */}
        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                {item.question}
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 md:mt-20 text-gray-500">
          <p>&copy; 2025 TRACS. All rights reserved.</p>
        </footer>

      </div>
      <Footer />
    </div>
  );
};

export default FaqIem;