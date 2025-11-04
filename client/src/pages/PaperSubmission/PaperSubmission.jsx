import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaperSubmission.css';
import { FaFileUpload, FaCheckCircle, FaTimes, FaClock, FaChartBar } from 'react-icons/fa';
import base_url from '../../config';

const PaperSubmission = () => {
    const [paperFile, setPaperFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [paperstatus, setpaperstatus] = useState('no paper');
    const [checkingStatus, setCheckingStatus] = useState(true);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const token = localStorage.getItem("token");

    // Fetch paper status from database
    useEffect(() => {
        const checkSubmissionStatus = async () => {
            if (!token) {
                setCheckingStatus(false);
                toast.error("You must be logged in to submit a paper.");
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${base_url}/users/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const userData = response.data;
                console.log('User data:', userData);

                // Get paper status from user data
                const status = userData.paperstatus || userData.paperStatus;
                console.log('Current paper status from database:', status);
                
                // Set the paper status
                setpaperstatus(status || 'no paper');

                // Update localStorage with latest data
                localStorage.setItem('user', JSON.stringify(userData));

            } catch (error) {
                console.error('Error checking submission status:', error);
                toast.error("Failed to fetch paper status. Please try again.");
                
                // Fallback to localStorage if API fails
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    const status = parsedUser.paperstatus || parsedUser.paperStatus;
                    setpaperstatus(status || 'no paper');
                }
            } finally {
                setCheckingStatus(false);
            }
        };

        checkSubmissionStatus();
    }, [token, navigate]);

    const handleFileChange = (e) => {
        // Only allow file selection if submission is allowed
        if (!allowSubmission) {
            toast.error("Paper submission is not allowed with your current paper status.");
            return;
        }

        const file = e.target.files[0];
        if (file) {
            // Check file extension
            const fileName = file.name.toLowerCase();
            const allowedExtensions = ['.doc', '.docx'];
            const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
            
            const maxSize = 10 * 1024 * 1024; // 10MB
            
            if (!allowedExtensions.includes(fileExtension)) {
                toast.error("Invalid file type. Please upload a .doc or .docx file.");
                e.target.value = '';
                return;
            }
            
            if (file.size > maxSize) {
                toast.error("File size exceeds 10MB limit. Please upload a smaller file.");
                e.target.value = '';
                return;
            }
            
            setPaperFile(file);
            setShowPreview(true);
        }
    };

    const handleRemoveFile = () => {
        setPaperFile(null);
        setShowPreview(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUploadAreaClick = () => {
        // Prevent upload area click if submission is not allowed
        if (!allowSubmission) {
            toast.error("Paper submission is not allowed with your current paper status.");
            return;
        }
        
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmitPaper = async () => {
        // Double-check submission permission before proceeding
        if (!allowSubmission) {
            toast.error("Paper submission is not allowed with your current paper status.");
            return;
        }

        if (!paperFile) {
            toast.error("Please upload your paper before submitting.");
            return;
        }

        if (!token) {
            toast.error("You must be logged in to submit a paper.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', paperFile);
        formData.append('submissionType', paperstatus === 'correction required' ? 'correction' : 'initial');

        try {
            const response = await axios.post(
                `${base_url}/register/paper`, 
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            toast.success("Paper submitted successfully!");
            setSubmitted(true);

            // Update status with response from backend
            if (response.data.user) {
                const status = response.data.user.paperstatus || response.data.user.paperStatus;
                setpaperstatus(status || 'submitted');
                localStorage.setItem('user', JSON.stringify(response.data.user));
            } else {
                setpaperstatus('submitted');
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit paper. Please try again.");
            console.error("Paper submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckStatus = () => {
        navigate('/status');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Only allow submission for 'no paper' and 'correction required'
    const allowSubmission = paperstatus === 'no paper' || paperstatus === 'correction required';

    // Helper to generate the "Not Allowed" status display
    const renderStatusDisplay = () => {
        let title = '';
        let text = '';
        let icon = null;
        let className = '';

        switch (paperstatus) {
            case 'submitted':
                title = 'Paper Already Submitted';
                text = 'Your paper has already been submitted and is awaiting review.';
                icon = <FaClock className="ps-success-icon" />;
                className = 'status-pending';
                break;
            case 'pending':
                title = 'Paper Under Review';
                text = 'Your paper is currently being reviewed. Please check back later for updates.';
                icon = <FaClock className="ps-success-icon" />;
                className = 'status-pending';
                break;
            case 'approved':
                title = 'Your Paper is Approved';
                text = 'Your paper has already been approved. No further submissions are necessary.';
                icon = <FaCheckCircle className="ps-success-icon" />;
                className = 'status-success';
                break;
            case 'rejected':
                title = 'Paper Not Accepted';
                text = 'After review, your paper has not been accepted. A new submission is not possible.';
                icon = <FaTimes className="ps-success-icon" />;
                className = 'status-danger';
                break;
            case 'correction required':
                // This case should not appear here since it's allowed to submit
                title = 'Correction Required';
                text = 'Please upload the corrected version of your paper.';
                icon = <FaTimes className="ps-success-icon" />;
                className = 'status-danger';
                break;
            default:
                title = 'Submission Not Allowed';
                text = `Your paper status is currently: ${paperstatus}. A new submission is not allowed.`;
                icon = <FaTimes className="ps-success-icon" />;
                className = 'status-danger';
        }

        return (
            <div className="ps-success-message">
                <div className={`ps-success-header ${className}`}>
                    {icon}
                    <h3 className="ps-success-title">{title}</h3>
                </div>
                <p className="ps-success-text">{text}</p>
                <p className="ps-success-text">
                    You can review the full details on the status page.
                </p>
                <div className="ps-success-actions">
                    <button 
                        onClick={handleCheckStatus} 
                        className="ps-btn ps-btn-primary"
                        type="button"
                    >
                        <FaChartBar className="ps-btn-icon" />
                        Check Status
                    </button>
                </div>
            </div>
        );
    };

    // Show loading while checking status
    if (checkingStatus) {
        return (
            <div className="ps-page-container">
                <div className="ps-loading-container">
                    <div className="loader">
                        <div className="loader-dot"></div>
                        <div className="loader-dot"></div>
                        <div className="loader-dot"></div>
                    </div>
                    <p className="loading-text">Checking paper status...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="ps-page-container">
                <header className="ps-page-header">
                    <h1>Paper Submission</h1>
                    <p>Upload your final paper for the conference review process</p>
                </header>
                <div className="ps-main-container">
                    <div className="ps-left-panel">
                        <div>
                            <h2 className="ps-left-panel-title">Paper<br/>Submission</h2>
                            <div className="ps-left-panel-info">
                                <p className="ps-info-title">Submission Guidelines:</p>
                                <ul className="ps-info-list">
                                    <li>Your abstract has been approved</li>
                                    <li>Upload final paper in .doc or .docx format</li>
                                    <li>Maximum file size: 10MB</li>
                                    <li>Follow all formatting guidelines</li>
                                    <li>Preview your file before submission</li>
                                    <li>Review process takes 2-3 weeks</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="ps-right-panel">
                        {allowSubmission ? (
                            // Show form or success message if submission is allowed
                            !submitted ? (
                                <div className="ps-form-body">
                                    
                                    {/* Status notification for correction required */}
                                    {paperstatus === 'correction required' && (
                                        <div className="ps-status-notification status-danger">
                                            <FaTimes className="ps-status-notification-icon" />
                                            <div className="ps-status-notification-text">
                                                <strong>Status: Correction Required</strong>
                                                <p>Your previous submission requires corrections. Please upload a revised version of your paper.</p>
                                            </div>
                                        </div>
                                    )}

                                    <h3 className="ps-form-title">
                                        {paperstatus === 'correction required'
                                            ? 'Upload Your Corrected Paper'
                                            : 'Upload Your Full Paper'}
                                    </h3>
                                    
                                    {!showPreview ? (
                                        <div className="ps-upload-area" onClick={handleUploadAreaClick}>
                                            <FaFileUpload className="ps-upload-icon" />
                                            <p>Drag & drop your file here or</p>
                                            <input 
                                                ref={fileInputRef}
                                                type="file" 
                                                id="paperUpload" 
                                                onChange={handleFileChange} 
                                                style={{ display: 'none' }} 
                                                accept=".doc,.docx"
                                            />
                                            <div className="ps-upload-label">Browse File</div>
                                            <p className="ps-upload-hint">Supported formats: .doc, .docx | Max size: 10MB</p>
                                        </div>
                                    ) : (
                                        <div className="ps-preview-container">
                                            <div className="ps-preview-header">
                                                <h4>File Preview</h4>
                                                <button onClick={handleRemoveFile} className="ps-remove-btn" type="button">
                                                    <FaTimes />
                                                </button>
                                            </div>
                                            <div className="ps-file-preview">
                                                <div className="ps-file-icon">
                                                    <FaFileUpload />
                                                </div>
                                                <div className="ps-file-details">
                                                    <h5 className="ps-file-name">{paperFile.name}</h5>
                                                    <div className="ps-file-meta">
                                                        <span className="ps-file-size">{formatFileSize(paperFile.size)}</span>
                                                        <span className="ps-file-type">
                                                            {paperFile.name.endsWith('.doc') ? 'DOC' : 'DOCX'}
                                                        </span>
                                                        <span className="ps-file-modified">
                                                            Last modified: {new Date(paperFile.lastModified).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ps-preview-actions">
                                                <button 
                                                    onClick={handleSubmitPaper} 
                                                    className="ps-btn ps-btn-primary"
                                                    disabled={loading}
                                                    type="button"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <div className="loader">
                                                                <div className="loader-dot"></div>
                                                                <div className="loader-dot"></div>
                                                                <div className="loader-dot"></div>
                                                            </div>
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        'Submit Paper'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="ps-form-body">
                                    <div className="ps-success-message">
                                        <div className="ps-success-header status-success">
                                            <FaCheckCircle className="ps-success-icon" />
                                            <h3 className="ps-success-title">Paper Submitted Successfully!</h3>
                                        </div>
                                        <div className="ps-submission-details">
                                            <div className="ps-detail-item">
                                                <span className="ps-detail-label">Paper Title:</span>
                                                <span className="ps-detail-value">{paperFile?.name.replace(/\.[^/.]+$/, "")}</span>
                                            </div>
                                            <div className="ps-detail-item">
                                                <span className="ps-detail-label">Submitted Date:</span>
                                                <span className="ps-detail-value">{new Date().toLocaleDateString()}</span>
                                            </div>
                                            <div className="ps-detail-item">
                                                <span className="ps-detail-label">Current Status:</span>
                                                <span className="ps-status-badge">
                                                    <FaClock className="ps-status-icon" />
                                                    Under Review
                                                </span>
                                            </div>
                                        </div>
                                        <p className="ps-success-text">
                                            Thank you for submitting your paper. Your submission has been received and is now under review.
                                            You will receive a confirmation email shortly with your submission details.
                                        </p>
                                        <div className="ps-success-actions">
                                            <button 
                                                onClick={handleCheckStatus} 
                                                className="ps-btn ps-btn-primary"
                                                type="button"
                                            >
                                                <FaChartBar className="ps-btn-icon" />
                                                Check Status
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            // Show status message if submission is NOT allowed
                            <div className="ps-form-body">
                                {renderStatusDisplay()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaperSubmission;