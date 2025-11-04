import React, { useState, useEffect, useRef } from 'react';
import './TicketPage.css';
import {
    FaTicketAlt, FaIdCard, FaCalendarAlt,
    FaBuilding, FaEnvelope, FaDownload, FaUsers
} from 'react-icons/fa';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import base_url from "../../config";
import { Link } from 'react-router-dom'; // Import Link for navigation

// Simple Online QR Code with black color
const OnlineQRCode = ({ value, size = 160 }) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&format=png&margin=10&color=000000&bgcolor=ffffff`;
    
    return (
        <div className="online-qr-code">
            <img 
                src={qrUrl} 
                alt="QR Code" 
                className="qr-image"
                width={size}
                height={size}
                crossOrigin="anonymous" 
                onError={(e) => {
                    e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(value)}&format=png&color=000000`;
                }}
            />
            <p className="qr-scan-text">SCAN FOR ENTRY</p>
        </div>
    );
};

// Loader Component
const Loader = () => (
    <div className="loader-container">
        <div className="loader-dots">
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
        </div>
        <p className="loader-text">Loading Your Ticket...</p>
    </div>
);

// Function to extract numeric part from userId like "IC6850" -> "6850"
const extractNumericUserId = (userid) => {
    if (!userid) return '';
    return userid.replace(/\D/g, '');
};

// --- HELPER FUNCTION ---
// This function determines the registration status based on your logic.
const getRegistrationStatus = (profileData) => {
    // Set default values if fields are missing
    const { 
        abstractStatus = "no abstract", 
        paperStatus = "no paper", 
        paymentStatus = "unpaid" 
    } = profileData;

    const isAbstractRejected = abstractStatus === 'rejected';
    const isPaperRejected = paperStatus === 'rejected';

    // Case 0: Abstract not submitted
    if (abstractStatus === "no abstract") {
        return { isComplete: false, message: "Submit your abstract to begin the review process." };
    }
    
    // Case 1: Abstract under review or rejected
    if (abstractStatus === "submitted") {
            return { isComplete: false, message: "Our committee is currently reviewing your abstract submission." };
    }
    if (isAbstractRejected) {
        return { isComplete: false, message: "Unfortunately, your abstract was not accepted. Please check your email for feedback." };
    }

    // --- If here, abstract is 'approved' ---

    // Case 2: Paper not submitted
    if (abstractStatus === 'approved' && (paperStatus === "no paper" || !paperStatus)) {
        return { isComplete: false, message: "Congratulations! Your abstract has been accepted. Please submit your full paper." };
    }

    // Case 3: Paper under review, needs correction, or rejected
    if (paperStatus === "submitted") {
        return { isComplete: false, message: "Your paper has been submitted and is under review by our committee." };
    }
    if (paperStatus === "correction required") {
        return { isComplete: false, message: "Corrections are required for your paper. Please check your email for details." };
    }
    if (isPaperRejected) {
        return { isComplete: false, message: "Unfortunately, your paper was not accepted. Please check your email for feedback." };
    }

    // --- If here, paper is 'approved' ---

    // Case 4: Payment pending
    if (paperStatus === "approved" && paymentStatus === "unpaid") {
        return { isComplete: false, message: "Your paper has been approved! Please complete the payment to finalize your registration." };
    }

    // Case 5: Registration Complete!
    // Assumes 'paid' is the final payment status
    if (paperStatus === "approved" && paymentStatus === "paid") {
            return { isComplete: true, message: "Congratulations! Your registration is complete! We look forward to seeing you at the conference!" };
    }

    // Fallback for any other unexpected state
    return { isComplete: false, message: "Your registration status is pending. Please check your dashboard." };
};


// Main Ticket Page Component
const TicketPage = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for download button
    const [isDownloading, setIsDownloading] = useState(false);
    
    // Ref for the ticket element
    const ticketRef = useRef(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Authentication token not found. Please log in.');

                const response = await axios.get(`${base_url}/users/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.data) throw new Error('No profile data found in the API response.');
                setProfileData(response.data);
            
            } catch (err) {
                
                // --- AUTHENTICATION ERROR HANDLING ---
                // Check if the error is the JSON parse error (from receiving HTML)
                // or if the server *did* send a 401 (Unauthorized) status
                if (err.message.includes("Unexpected token '<'") || err.response?.status === 401) {
                    
                    setError("Your session has expired. Please log in again.");
                    
                    // Clear the invalid token and user data from storage
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    localStorage.removeItem('loginTime');

                    // Give the user a second to see the message, then redirect to home.
                    // This forces AppLayout to re-check auth and find nothing.
                    setTimeout(() => {
                        window.location.href = '/'; // Force reload to homepage
                    }, 2000);

                } else {
                    // This is for other network errors (e.g., server is down)
                    setError(err.response?.data?.message || err.message || 'Failed to fetch profile data.');
                }
                // --- END OF AUTH LOGIC ---

            } finally {
                setTimeout(() => setIsLoading(false), 1000);
            }
        };

        fetchProfileData();
    }, []); // Empty dependency array ensures this runs once on mount

    // PDF Download Function
    const handleDownloadPdf = async () => {
        const element = ticketRef.current;
        if (!element) return;

        setIsDownloading(true);

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('conference-ticket.pdf');

        } catch (err) {
            console.error("Error generating PDF:", err);
            setError("Could not download ticket. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    // --- RENDER LOGIC ---

    if (isLoading) return <Loader />;
    
    if (error) return (
        <main className="ticket-page-container">
             <header className="tp-header" style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
                <h1>Error</h1>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.5', color: '#dc2626' }}>
                    {error}
                </p>
                {/* Show login button if session expired */}
                {error.includes("session has expired") && (
                     <Link to="/" className="download-btn" style={{ textDecoration: 'none' }}>
                        Return to Home
                    </Link>
                )}
            </header>
        </main>
    );
    
    // Add a check in case profile data is empty
    if (!profileData) return <div className="profile-page-error">Could not load profile data.</div>;

    // Check registration status
    const { isComplete, message } = getRegistrationStatus(profileData);

    // If registration is NOT complete, show the status message
    if (!isComplete) {
        return (
            <main className="ticket-page-container">
                <header className="tp-header" style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
                    <h1>Registration Incomplete</h1>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                        {message}
                    </p>
                    {/* Button to navigate user to their dashboard */}
                    <Link to="/status" className="download-btn" style={{ textDecoration: 'none' }}>
                        Check Status
                    </Link>
                </header>
            </main>
        );
    }

    // --- If registration IS complete, render the ticket ---
    
    // Get the actual user ID from profile data
    const actualUserId = profileData?.userid || '';

    const participantCount = profileData.participants?.length || 0;

    // Create simple QR code data
    const qrData = JSON.stringify({
        id: profileData.userid,
        numericUserId: actualUserId, // Use the extracted numeric ID if needed, or actualUserId
        event: "IT Conference 2024",
        type: "attendee"
    });

    return (
        <main className="ticket-page-container">
            <header className="tp-header">
                <h1>Your Conference Ticket</h1>
                <p>This is your official pass. Please have it ready for scanning.</p>
                
                {/* Download Button */}
                <button 
                    className="download-btn"
                    onClick={handleDownloadPdf} 
                    disabled={isDownloading}
                >
                    {isDownloading ? 'Downloading...' : (
                        <>
                            <FaDownload /> Download Ticket (PDF)
                        </>
                    )}
                </button>
            </header>

            {/* Ticket wrapper with ref for PDF generation */}
            <div className="ticket-wrapper" ref={ticketRef}>
                {/* Ticket Body */}
                <div className="ticket-body">
                    <div className="ticket-body-header">
                        <div className="ticket-brand">
                            <FaTicketAlt />
                            <h3>IC CONFERENCE PASS</h3>
                        </div>
                        <h1 className="ticket-title">DIGITAL ACCESS PASS</h1>
                    </div>

                    <div className="ticket-main-content">
                        <div className="primary-info">
                            {/* Display the actual User ID prominently */}
                            <div className="primary-info-item user-id-highlight">
                                <span className="ticket-label">
                                    <FaIdCard />
                                    USER ID
                                </span>
                                <p className="ticket-value-large user-id-number">{actualUserId}</p>
                            
                            </div>

                            <div className="primary-info-item">
                                <span className="ticket-label">
                                    SELECTED TRACK
                                </span>
                                <p className="ticket-value-large">{profileData.track.toUpperCase() || 'Track 1'}</p>
                            </div>

                            <div className="primary-info-item">
                                <span className="ticket-label">
                                    <FaEnvelope />
                                    EMAIL ADDRESS
                                </span>
                                <p className="ticket-value">{profileData.email}</p>
                            </div>

                            <div className="primary-info-item">
                                    <span className="ticket-label">
                                        <FaUsers />
                                        PARTICIPANTS
                                    </span>
                                    <p className="ticket-value">{participantCount}</p>
                            </div>
                        </div>

                        <div className="detail-grid-section">
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="ticket-label">
                                        <FaCalendarAlt />
                                        PRESENTATION MODE
                                    </span>
                                    <p className="ticket-value">{profileData.presentationMode || 'offline'}</p>
                                </div>
                                <div className="detail-item">
                                    <span className="ticket-label">
                                        <FaBuilding />
                                        ORGANISATION
                                    </span>
                                    <p className="ticket-value">{profileData.participants?.[0]?.organisation || 'KSR'}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="ticket-body-footer">
                        <div className="transaction-info">
                            <span className="ticket-label">TRANSACTION ID</span>
                            {/* You might want to pull this from profileData.paymentTransactionId or similar */}
                            <p className="ticket-value-mono">{profileData.paymentid || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="ticket-divider">
                    <div className="divider-notch top-notch"></div>
                    <div className="divider-notch bottom-notch"></div>
                </div>

                {/* Ticket Stub with Online QR Code */}
                <div className="ticket-stub">
                    <div className="stub-content">
                        <div className="stub-header">
                            <div className="stub-status">
                                VALID ENTRY PASS
                            </div>
                        </div>

                        {/* Online QR Code */}
                        <OnlineQRCode 
                            value={qrData}
                            size={160}
                        />
                        
                        <div className="conference-info">
                            <div className="stub-detail">
                                <span className="ticket-label">CONFERENCE</span>
                                <p className="ticket-value-mono">IC Conference 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TicketPage;