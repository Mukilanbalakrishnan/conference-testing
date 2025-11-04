import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import './Navbar.css';

import SignIn from '/src/pages/Login/Signin';
import RegistrationForm from '/src/pages/Login/LoginForm';

const Navbar = ({ user, onLogout, onOpenLogin }) => {
    const [sidemenu, setSideMenu] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll transparency and body class
    useEffect(() => {
        const isHomePage = location.pathname === '/';
        const handleScroll = () => setIsTransparent(window.scrollY <= 10);
        
        if (isHomePage) {
            handleScroll();
            window.addEventListener("scroll", handleScroll);
        } else {
            setIsTransparent(false);
        }

        return () => {
            if (isHomePage) window.removeEventListener("scroll", handleScroll);
        };
    }, [location.pathname]);

    // Add body classes for scroll lock
    useEffect(() => {
        if (sidemenu) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }
    }, [sidemenu]);
    
    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmitPaper = () => {
        const token = localStorage.getItem("token");
        if (token) {
             try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp * 1000 > Date.now()) {
                    navigate("/register");
                    return;
                }
            } catch (e) {
                console.error("Invalid token:", e);
            }
        }
        onOpenLogin();
    };


    

    const navLinkClass = ({ isActive }) => (isActive ? "active" : "");
    const headerClass = `header ${!isTransparent ? "scrolled" : ""}`;

    return (
        <>
            <header className={headerClass}>
                <div className="header-container">
                    <ul className="desktop-nav">
                        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                        <li className="nav-item-dropdown">
                            <p className="dropdown-trigger">Committees <IoIosArrowDown /></p>
                            <div className="nav-item-dropdown-content">
                                <div className="dropdown-links">
                                    <p onClick={() => navigate("/committees/advisory-board")}>Advisory Board</p>
                                    <p onClick={() => navigate("/committees/organizing-committee")}>Organizing Committee</p>
                                    <p onClick={() => navigate("/committees/research-and-review-committee")}>Research and Review Committee</p>
                                </div>
                            </div>
                        </li>
                        <li><NavLink to="/agenda" className={navLinkClass}>Agenda</NavLink></li>
                        <li><NavLink to="/speaker" className={navLinkClass}>Speaker</NavLink></li>
                        <li><NavLink to="/conferencetrack" className={navLinkClass}>Tracks</NavLink></li>
                        <li><NavLink to="/venue" className={navLinkClass}>Venue</NavLink></li>
                        <li><NavLink to="/journal" className={navLinkClass}>Journal</NavLink></li>
                        <li><NavLink to="/feestructure" className={navLinkClass}>Fee Details</NavLink></li>
                        <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
                    </ul>
                    <div className="header-actions">
                        {user ? (
                            <div className="user-profile-menu" ref={profileRef}>
                                <div className="profile-trigger" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                    <img src={`https://ui-avatars.com/api/?name=${user.userId}&background=0D47A1&color=fff`} alt="User Profile" className="profile-picture" />
                                    <span className="profile-user-name">{user.userId}</span>
                                    <IoIosArrowDown className={`profile-chevron ${isProfileOpen ? 'open' : ''}`} />
                                </div>
                                <div className={`profile-dropdown-content ${isProfileOpen ? 'open' : ''}`}>
                                    <div className="profile-links">
                                        <div className="dropdown-link" onClick={() => { navigate('/team'); setIsProfileOpen(false); }}>Team</div>
                                        <div className="dropdown-link" onClick={() => { navigate('/status'); setIsProfileOpen(false); }}>Status</div>
                                        <div className="dropdown-link" onClick={() => { navigate('/ticket'); setIsProfileOpen(false); }}>Ticket</div>
                                        <div className="dropdown-link" onClick={onLogout}>Logout</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={handleSubmitPaper} className="login-btn">SUBMIT PAPER</button>
                        )}
                        <HiOutlineMenuAlt3 className="mobile-menu-button" onClick={() => setSideMenu(true)} />
                    </div>
                </div>
            </header>
            
            <div className={`mobile-sidemenu ${sidemenu ? "open" : ""}`}>
                <div className="sidemenu-header">
                    <span className="sidemenu-title">Menu</span>
                    <IoCaretBackOutline className="sidemenu-close-btn" onClick={() => setSideMenu(false)} />
                </div>
                <ul className="mobile-nav-links">
                    <li><NavLink to="/" className={navLinkClass} onClick={() => setSideMenu(false)}>Home</NavLink></li>
                    <details className="mobile-dropdown">
                        <summary>Committees <IoIosArrowDown /></summary>
                        <div className="mobile-dropdown-content">
                            <p onClick={() => { navigate("/committees/advisory-board"); setSideMenu(false); }}>Advisory Board</p>
                            <p onClick={() => { navigate("/committees/organizing-committee"); setSideMenu(false); }}>Organizing Committee</p>
                            <p onClick={() => { navigate("/committees/research-and-review-committee"); setSideMenu(false); }}>Research and Review Committee</p>
                        </div>
                    </details>
                    <li><NavLink to="/agenda" className={navLinkClass} onClick={() => setSideMenu(false)}>Agenda</NavLink></li>
                    <li><NavLink to="/speaker" className={navLinkClass} onClick={() => setSideMenu(false)}>Speaker</NavLink></li>
                    <li><NavLink to="/conferencetrack" className={navLinkClass} onClick={() => setSideMenu(false)}>Tracks</NavLink></li>
                    <li><NavLink to="/venue" className={navLinkClass} onClick={() => setSideMenu(false)}>Venue</NavLink></li>
                    <li><NavLink to="/journal" className={navLinkClass} onClick={() => setSideMenu(false)}>Journal</NavLink></li>
                    <li><NavLink to="/feestructure" className={navLinkClass} onClick={() => setSideMenu(false)}>Fee Details</NavLink></li>
                    <li><NavLink to="/contact" className={navLinkClass} onClick={() => setSideMenu(false)}>Contact</NavLink></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;

