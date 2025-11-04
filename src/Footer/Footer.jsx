// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaLinkedin, FaFacebook, FaXTwitter, FaInstagram, FaArrowUp } from "react-icons/fa6";
// import './Footer.css'; // Import the stylesheet

// export const Footer = () => {
//     // Function to scroll to the top of the page
//     const handleBackToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     return (
//         <footer className="footer-container">
//             <div className="container footer-main">
//                 <div className="footer-layout">

//                     {/* Left Side: Brand Info */}
//                     <div className="footer-brand-section">
//                         <Link to="/" className="footer-brand">
//                             <span className="brand-main-text">KSR</span>
//                             <span className="brand-sub-text">College of Engineering</span>
//                         </Link>
//                         <p className="brand-tagline">
//                             Empowering students with advanced tools to improve their skills and career outcomes.
//                         </p>
//                         <div className="social-icons">
//                             <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="footer-link">
//                                 <FaXTwitter />
//                             </a>
//                             <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-link">
//                                 <FaLinkedin />
//                             </a>
//                             <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-link">
//                                 <FaInstagram />
//                             </a>
//                             <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-link">
//                                 <FaFacebook />
//                             </a>
//                         </div>
//                         <button className="back-to-top-btn" onClick={handleBackToTop}>
//                             <FaArrowUp />
//                             <span>Back to Top</span>
//                         </button>
//                     </div>

//                     {/* Right Side: Links */}
//                     <div className="footer-links-section">
//                         <div className="footer-column">
//                             <h3 className="footer-heading">Site Map</h3>
//                             <ul className="footer-list">
//                                 <li><NavLink to="/" className="footer-link">Homepage</NavLink></li>
//                                 <li><NavLink to="/agenda" className="footer-link">Agenda</NavLink></li>
//                                 <li><NavLink to="/speaker" className="footer-link">Speakers</NavLink></li>
//                                 <li><NavLink to="/committees" className="footer-link">Committees</NavLink></li>
//                                 <li><NavLink to="/contact" className="footer-link">Contact Us</NavLink></li>
//                             </ul>
//                         </div>
//                         <div className="footer-column">
//                             <h3 className="footer-heading">Tracks</h3>
//                             <ul className="footer-list">
//                                 <li><NavLink to="/conferencetrack" className="footer-link">Track</NavLink></li>
//                                 {/* <li><NavLink to="/tracks/2" className="footer-link">Track 2</NavLink></li>
//                                 <li><NavLink to="/tracks/3" className="footer-link">Track 3</NavLink></li>
//                                 <li><NavLink to="/tracks/4" className="footer-link">Track 4</NavLink></li> */}
//                             </ul>
//                         </div>
//                         <div className="footer-column">
//                             <h3 className="footer-heading">Legal</h3>
//                             <ul className="footer-list">
//                                 <li><NavLink to="/privacy" className="footer-link">Privacy Policy</NavLink></li>
//                                 <li><NavLink to="/terms" className="footer-link">Terms of Services</NavLink></li>
//                             </ul>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//             {/* Bottom Copyright Bar */}
//             <div className="footer-copyright-bar">
//                 <p>© {new Date().getFullYear()} KSR Educational Institutions. All Rights Reserved.</p>
//             </div>
//         </footer>
//     );
// };

// export default Footer; 




import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaLinkedin, FaFacebook, FaXTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa6';

// --- STYLES ---
// All CSS is included directly in the component file.
const componentStyles = `
/* --- Global Variables Used --- */
:root {
    --brand-blue-dark: #0D47A1;
    --brand-orange: #F57C00;
    --white: #FFFFFF;
}

/* --- Main Footer Container --- */
.footer-container {
    background-color: var(--brand-blue-dark);
    color: var(--white);
    padding: 4rem 2rem 0; /* Add padding, remove bottom for copyright bar */
    border-top: 4px solid var(--brand-orange);
    width: 100%;
    box-sizing: border-box;
}

.footer-content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* --- Main Layout Grid --- */
.footer-layout {
    display: grid;
    grid-template-columns: 1fr; /* Single column on mobile */
    gap: 3rem;
}

@media (min-width: 768px) {
    .footer-layout {
        grid-template-columns: repeat(2, 1fr); /* Two columns on tablet */
    }
}

@media (min-width: 1024px) {
    .footer-layout {
         /* 1.5fr for brand, 3x 1fr for links */
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
    }
}

/* --- Brand Section (Left) --- */
.footer-brand-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.footer-brand {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: inherit;
    width: fit-content;
}

.brand-main-text {
    font-size: 2.25rem;
    font-weight: 800;
    color: var(--brand-orange);
}

.brand-sub-text {
    font-size: 0.875rem;
    line-height: 1.2;
    color: rgba(255, 255, 255, 0.8);
    max-width: 80px;
}

.brand-tagline {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    max-width: 320px;
    margin-top: 0.5rem;
}

/* --- Social Icons --- */
.social-icons {
    display: flex;
    gap: 0.75rem; /* Reduced gap */
    margin-top: 0.5rem;
}

.social-icons a {
    color: var(--white);
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.3s ease, color 0.3s ease;
    text-decoration: none;
}

.social-icons a:hover {
    background-color: var(--brand-orange);
    color: var(--white);
}


/* --- Links Section (Right) --- */
@media (min-width: 1024px) {
    .footer-links-section {
        grid-column: span 3 / span 3; /* Make link columns span the remaining space */
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }
}


.footer-heading {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.95);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.footer-list a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    transition: color 0.3s ease, padding-left 0.3s ease;
    position: relative;
}

.footer-list a:hover {
    color: var(--brand-orange);
    padding-left: 5px;
}


/* --- Copyright & Back to Top Bar --- */
.footer-copyright-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    max-width: 1200px;
    margin: 0 auto;
}

.footer-copyright-bar p {
    margin: 0;
}

.back-to-top-btn {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--white);
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 1.2rem;
}

.back-to-top-btn:hover {
    background-color: var(--brand-orange);
    transform: translateY(-3px);
}
`;


const Footer = () => {
    // Function to scroll to the top of the page
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <React.Fragment>
            <style>{componentStyles}</style>
            <footer className="footer-container">
                <div className="footer-content-wrapper">
                    <div className="footer-layout">

                        {/* Left Side: Brand Info */}
                        <div className="footer-brand-section">
                            <Link to="/" className="footer-brand">
                                <span className="brand-main-text">K.S.R</span>
                                <span className="brand-sub-text">College of Engineering</span>
                            </Link>
                            <p className="brand-tagline">
                                Empowering students with advanced tools to improve their skills and career outcomes.
                            </p>
                            <div className="social-icons">
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                                    <FaXTwitter />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <FaLinkedin />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <FaInstagram />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <FaFacebook />
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Links Columns */}
                        <div className="footer-column">
                            <h3 className="footer-heading">Site Map</h3>
                            <ul className="footer-list">
                                <li><NavLink to="/">Homepage</NavLink></li>
                                <li><NavLink to="/agenda">Agenda</NavLink></li>
                                <li><NavLink to="/speaker">Speakers</NavLink></li>
                                <li><NavLink to="/committees/advisory-board">Committees</NavLink></li>
                                <li><NavLink to="/contact">Contact Us</NavLink></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3 className="footer-heading">Details</h3>
                            <ul className="footer-list">
                                <li><NavLink to="/conferencetrack">Conference Tracks</NavLink></li>
                                <li><NavLink to="/journal">Associated Journals</NavLink></li>
                                <li><NavLink to="/feestructure">Fee Structure</NavLink></li>
                                <li><NavLink to="/venue">Venue</NavLink></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3 className="footer-heading">Legal</h3>
                            <ul className="footer-list">
                                <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
                                <li><NavLink to="/terms">Terms of Services</NavLink></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="footer-copyright-bar">
                    <div className='footer-copyright-bar-company'>© {new Date().getFullYear()} FleoPix. All Rights Reserved.</div>
                    <button className="back-to-top-btn" onClick={handleBackToTop} aria-label="Back to top">
                        <FaArrowUp />
                    </button>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;