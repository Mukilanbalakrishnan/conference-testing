import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Page Components
import Home from '../pages/Home/Home';
import Venue from '../pages/Venue/Venue';
import Speaker from '../pages/Speaker/Speaker';
import Contact from '../pages/Contact/contact';
import Agenda from '../pages/Agenda/agenda';
import AdvisoryBoard from '../pages/AdvisoryBoard/AdvisoryBoardPage';
import OrganizingCom from '../pages/OrganizingCommittee/OrganizingCommitteePage';
import ResearchCom from '../pages/Researchandreview/Researchandreview';
import RegistrationForm from '../pages/Register/RegisterForm';
import SubmissionStatusTracker from '../pages/statustracker/SubmissionStatusTracker';
import ConferenceTracksPage from '../pages/ConferenceTrack/ConferenceTracksPage';
import Journal from '../pages/Journal/journal';
import FeeStructure from '../pages/FeeStructure/FeeStructure';
import TeamProfile from '../pages/TeamProfile/TeamProfile';
import PaperSubmission from '../pages/PaperSubmission/PaperSubmission';
import ScrollToTop from '../scrolltop/ScrollToTop';
import TicketPage from '../pages/TicketPage/TicketPage';

// Layout & Auth Components
import Navbar from '../header/Navbar';
import Footer from '../Footer/Footer';
import Modal from '../pages/Login/Modal';
import SignInForm from '../pages/Login/Signin';
import SignUpForm from '../pages/Login/LoginForm';

// --- NEW LOADER COMPONENT ---
// (You can put this in its own file, but I've added it here for simplicity)
const FullPageLoader = ({ message = "Loading..." }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{message}</p>
        </div>
    </div>
);


// --- UPDATED Protected Route Component ---
const ProtectedRoute = ({ children, user, isLoadingSession, onOpenLogin }) => {
    
    useEffect(() => {
        // --- UPDATED LOGIC ---
        // 1. Wait for the session check to finish
        if (isLoadingSession) {
            return; // Do nothing, we are still loading
        }

        // 2. Now that loading is done, check for a user
        if (!user) {
            // If no user, *then* open the login modal
            onOpenLogin();
        }
    }, [user, isLoadingSession, onOpenLogin]); // Dependencies updated

    // --- UPDATED RENDER LOGIC ---

    // 1. If session is loading, show a loader
    if (isLoadingSession) {
        return <FullPageLoader message="Loading session..." />;
    }

    // 2. If loading is done AND we have a user, show the page
    if (user) {
        return children;
    }

    // 3. If loading is done and we have NO user, show a loader
    //    (The useEffect has already triggered the login modal)
    return <FullPageLoader message="Redirecting to login..." />;
};

const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Global state for the entire application
    const [user, setUser] = useState(null);
    
    // --- NEW LOADING STATE ---
    const [isLoadingSession, setIsLoadingSession] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signin');
    const TOKEN_EXPIRY = 12 * 60 * 60 * 1000; // 12 hours

    // --- UPDATED Session Check ---
    useEffect(() => {
        const checkUserSession = () => {
            // Ensure we set loading true at the start of the check
            setIsLoadingSession(true);
            try {
                const token = localStorage.getItem('token');
                const userData = localStorage.getItem('user');
                const loginTime = localStorage.getItem('loginTime');

                if (token && userData && loginTime) {
                    const now = Date.now();
                    if (now - parseInt(loginTime, 10) > TOKEN_EXPIRY) {
                        localStorage.clear();
                        setUser(null);
                        // No need to navigate, just set user to null
                    } else {
                        try {
                            setUser(JSON.parse(userData));
                        } catch (error) {
                            console.error("Failed to parse user data from storage", error);
                            localStorage.clear();
                            setUser(null);
                        }
                    }
                } else {
                    // No user data in storage
                    setUser(null);
                }
            } catch (err) {
                console.error("Error during session check:", err);
                localStorage.clear();
                setUser(null);
            } finally {
                // --- THIS IS THE KEY ---
                // Always set loading to false after the check is complete
                setIsLoadingSession(false);
            }
        };
        
        checkUserSession();
    }, [navigate]); // navigate dependency is fine

    // Manage body class for homepage's transparent navbar
    useEffect(() => {
        if (location.pathname === '/') {
            document.body.classList.add('is-home-page');
        } else {
            document.body.classList.remove('is-home-page');
        }
        return () => document.body.classList.remove('is-home-page');
    }, [location.pathname]);

    // --- Global Authentication Handlers ---
    const handleAuthSuccess = (responseData) => {
        if (!responseData || !responseData.token) {
            console.error("Auth success response is invalid:", responseData);
            return;
        }

        const { token, ...userData } = responseData;
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        localStorage.setItem('loginTime', Date.now().toString());
        setUser(userData);
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        setUser(null);
        navigate('/');
    };

    const handleOpenLogin = () => {
        setAuthMode('signin');
        setIsModalOpen(true);
    };
    
    const handleCloseLogin = () => setIsModalOpen(false);

    return (
        <>
            <Navbar user={user} onLogout={handleLogout} onOpenLogin={handleOpenLogin} />
            <main>
                <ScrollToTop />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home user={user} onOpenLogin={handleOpenLogin} />} />
                    <Route path="/venue" element={<Venue />} />
                    <Route path="/speaker" element={<Speaker />} />
                    <Route path="/contact" element={<Contact onOpenLogin={handleOpenLogin} />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/committees/advisory-board" element={<AdvisoryBoard />} />
                    <Route path="/committees/organizing-committee" element={<OrganizingCom />} />
                    <Route path="/committees/research-and-review-committee" element={<ResearchCom />} />
                    <Route path="/conferencetrack" element={<ConferenceTracksPage />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/feestructure" element={<FeeStructure onOpenLogin={handleOpenLogin} />} />
                    <Route path="/team" element={<TeamProfile />} />

                    {/* --- UPDATED Protected Routes --- */}
                    {/* Pass isLoadingSession to all protected routes */}
                    <Route 
                        path="/register" 
                        element={
                            <ProtectedRoute user={user} isLoadingSession={isLoadingSession} onOpenLogin={handleOpenLogin}>
                                <RegistrationForm />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/status" 
                        element={
                            <ProtectedRoute user={user} isLoadingSession={isLoadingSession} onOpenLogin={handleOpenLogin}>
                                <SubmissionStatusTracker />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/paper-submission" 
                        element={
                            <ProtectedRoute user={user} isLoadingSession={isLoadingSession} onOpenLogin={handleOpenLogin}>
                                <PaperSubmission />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/ticket" 
                        element={
                            <ProtectedRoute user={user} isLoadingSession={isLoadingSession} onOpenLogin={handleOpenLogin}>
                                <TicketPage />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Fallback route for 404 pages */}
                    <Route path="*" element={<div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                            <p className="text-xl text-gray-600">Page not found</p>
                        </div>
                    </div>} />
                </Routes>
            </main>
            <Footer />

            {/* Login/Signup Modal managed globally */}
            <Modal isOpen={isModalOpen} onClose={handleCloseLogin}>
                {authMode === 'signin' ? (
                    <SignInForm 
                        onSwitch={() => setAuthMode('signup')} 
                        onClose={handleCloseLogin}
                        onLoginSuccess={handleAuthSuccess}
                    />
                ) : (
                    <SignUpForm 
                        onSwitch={() => setAuthMode('signin')} 
                        onClose={handleCloseLogin} 
                        onSignUpSuccess={handleAuthSuccess}
                    />
                )}
            </Modal>
        </>
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
};

export default AppRoutes;