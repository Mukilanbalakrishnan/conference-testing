// import React from 'react';
// import './FeeStructure.css';
// import { useNavigate } from "react-router-dom"; 
// import { FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaUserFriends, FaToolbox, FaRegCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

// // --- Data for Fee Structure ---
// const feeData = [
//     {
//         icon: <FaUserGraduate />,
//         category: 'Student (with ID)',
//         prices: {
//             early: '8,000',
//             regular: '10,000',
//         },
//         featured: false,
//     },
//     {
//         icon: <FaChalkboardTeacher />,
//         category: 'Academic/Researcher',
//         prices: {
//             early: '10,000',
//             regular: '12,000',
//         },
//         featured: true, // This card will be highlighted
//     },
//     {
//         icon: <FaBuilding />,
//         category: 'Industry/Corporate',
//         prices: {
//             early: '10,000',
//             regular: '12,000',
//         },
//         featured: false,
//     },
    
// ];

// const importantNotes = [
//     {
//         icon: <FaRegCalendarAlt />,
//         title: 'Early Bird Deadline',
//         text: 'Before 31st January 2026'
//     },
//     {
//         icon: <FaClock />,
//         title: 'Regular Payment Deadline',
//         text: 'Before 20th February 2026'
//     },
// ];


// const FeeStructure = () => {
//     const navigate = useNavigate();
//     return (
//         <section className="fees-page-section">
//             <div className="container">
//                 <div className="fees-header">
//                     <h2>International Conference Fee Structure</h2>
//                     <p>All prices are in Indian Rupees (INR). Choose the plan that suits you best and register early to save!</p>
//                 </div>

//                 <div className="fees-notes-section">
//                        <h3 className="notes-title">Important Dates</h3>
//                        <div className="notes-grid">
//                             {importantNotes.map((note, index) => (
//                                 <div className="note-item" key={index}>
//                                     <div className="note-icon">{note.icon}</div>
//                                     <div className="note-text">
//                                         <strong>{note.title}:</strong> {note.text}
//                                     </div>
//                                 </div>
//                             ))}
//                        </div>
//                 </div>

//                 <div className="fees-disclaimer">
//                     <div className="disclaimer-icon"><FaInfoCircle /></div>
//                     <div className="disclaimer-text">
//                         <strong>Please Note:</strong> The conference fee is based on the team lead's registration category. For teams led by a student, the on-site fee is ₹12,000. For teams led by an academic/researcher, the on-site fee is ₹14,000. Payment will only be collected <strong>after</strong> abstract approval.
//                     </div>
//                 </div>


//                 <div className="fees-grid-layout">
//                     {/* Top Row: First 3 cards */}
//                     <div className="fees-row fees-row-top">
//                         {feeData.slice(0, 3).map((fee, index) => (
//                             <div className={`fee-card ${fee.featured ? 'featured' : ''}`} key={index}>
//                                 {fee.featured && <div className="featured-badge">Most Popular</div>}
//                                 <div className="fee-card-icon">
//                                     {fee.icon}
//                                 </div>
//                                 <h3 className="fee-card-category">{fee.category}</h3>
                                
//                                 <ul className="price-list">
//                                     <li className="price-item early-bird">
//                                         <span className="price-label">Early Bird</span>
//                                         <span className="price-value">₹{fee.prices.early}</span>
//                                     </li>
//                                     <li className="price-item">
//                                         <span className="price-label">Regular</span>
//                                         <span className="price-value">₹{fee.prices.regular}</span>
//                                     </li>
//                                 </ul>

//                                 <button className="btn-register" onClick={() => navigate("/register")}>Register Now</button>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Bottom Row: Remaining 2 cards */}
//                     <div className="fees-row fees-row-bottom">
//                         {feeData.slice(3).map((fee, index) => (
//                             <div className={`fee-card ${fee.featured ? 'featured' : ''}`} key={index}>
//                                 {fee.featured && <div className="featured-badge">Most Popular</div>}
//                                 <div className="fee-card-icon">
//                                     {fee.icon}
//                                 </div>
//                                 <h3 className="fee-card-category">{fee.category}</h3>
                                
//                                 <ul className="price-list">
//                                     <li className="price-item early-bird">
//                                         <span className="price-label">Early Bird</span>
//                                         <span className="price-value">₹{fee.prices.early}</span>
//                                     </li>
//                                     <li className="price-item">
//                                         <span className="price-label">Regular</span>
//                                         <span className="price-value">₹{fee.prices.regular}</span>
//                                     </li>
//                                     <li className="price-item">
//                                         <span className="price-label">On-site</span>
//                                         <span className="price-value">₹{fee.prices.onsite}</span>
//                                     </li>
//                                 </ul>

//                                 <button className="btn-register" onClick={() => navigate("/register")}>Register Now</button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FeeStructure;






import React from 'react';
import './FeeStructure.css';
import { useNavigate } from "react-router-dom"; 
import { FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaRegCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

// --- Data for Fee Structure ---
const feeData = [
  {
    icon: <FaUserGraduate />,
    category: 'Student (with ID)',
    prices: { early: '8,000', regular: '10,000' },
    featured: false,
  },
  {
    icon: <FaChalkboardTeacher />,
    category: 'Academic/Researcher',
    prices: { early: '10,000', regular: '12,000' },
    featured: true,
  },
  {
    icon: <FaBuilding />,
    category: 'Industry/Corporate',
    prices: { early: '10,000', regular: '12,000' },
    featured: false,
  },
];

const importantNotes = [
  { icon: <FaRegCalendarAlt />, title: 'Early Bird Deadline', text: 'Before 31st January 2026' },
  { icon: <FaClock />, title: 'Regular Payment Deadline', text: 'Before 20th February 2026' },
];

const FeeStructure = ({onOpenLogin}) => {
  const navigate = useNavigate();

  // ✅ function to check auth and navigate
  const handleRegisterClick = () => {
    const token = localStorage.getItem("token"); 
    if (token) {
      navigate("/register");
    } else {
      onOpenLogin();
    }
  };

  return (
    <section className="fees-page-section">
      <div className="container">
        <div className="fees-header">
          <h2>International Conference Fee Structure</h2>
          <p>All prices are in Indian Rupees (INR). Choose the plan that suits you best and register early to save!</p>
        </div>

        {/* Important Dates */}
        <div className="fees-notes-section">
          <h3 className="notes-title">Important Dates</h3>
          <div className="notes-grid">
            {importantNotes.map((note, index) => (
              <div className="note-item" key={index}>
                <div className="note-icon">{note.icon}</div>
                <div className="note-text">
                  <strong>{note.title}:</strong> {note.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="fees-disclaimer">
          <div className="disclaimer-icon"><FaInfoCircle /></div>
          <div className="disclaimer-text">
            <strong>Please Note:</strong> The conference fee is based on the team lead's registration category...
          </div>
        </div>

        {/* Fee Cards */}
        <div className="fees-grid-layout">
          <div className="fees-row fees-row-top">
            {feeData.slice(0, 3).map((fee, index) => (
              <div className={`fee-card ${fee.featured ? 'featured' : ''}`} key={index}>
                {fee.featured && <div className="featured-badge">Most Popular</div>}
                <div className="fee-card-icon">{fee.icon}</div>
                <h3 className="fee-card-category">{fee.category}</h3>
                <ul className="price-list">
                  <li className="price-item early-bird">
                    <span className="price-label">Early Bird</span>
                    <span className="price-value">₹{fee.prices.early}</span>
                  </li>
                  <li className="price-item">
                    <span className="price-label">Regular</span>
                    <span className="price-value">₹{fee.prices.regular}</span>
                  </li>
                </ul>
                <button className="btn-register" onClick={handleRegisterClick}>
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeeStructure;
