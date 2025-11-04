// import React, { useState } from 'react';

// // This component now includes its own styles.
// const componentStyles = `
// /* --- Global Styles & Variables --- */
// :root {
//     --brand-orange: #F57C00;
//     --brand-orange-dark: #E65100;
//     --brand-blue-dark: #0D47A1;
//     --brand-blue-primary: #1976D2;
//     --brand-red: #D32F2F;
//     --text-primary: #111318;
//     --text-secondary: #6c757d;
// }

// body {
//     font-family: 'Inter', sans-serif;
//     background-color: #f8f9fa;
//     margin: 0;
// }

// /* --- Main Layout --- */
// .main-container {
//     width: 100%;
//     max-width: 72rem; /* 1152px */
//     margin: 2rem auto;
//     display: grid;
//     grid-template-columns: 1fr;
//     border-radius: 1.5rem;
//     box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//     overflow: hidden;
// }

// @media (min-width: 1024px) {
//     .main-container {
//         grid-template-columns: repeat(3, minmax(0, 1fr));
//     }
// }

// /* --- Left Panel --- */
// .left-panel {
//     background-image: linear-gradient(rgba(13, 71, 161, 0.8), rgba(13, 71, 161, 0.9)), url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80');
//     background-size: cover;
//     background-position: center;
//     color: white;
//     padding: 2rem 3rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
// }

// .left-panel-title {
//     font-size: 1.875rem;
//     font-weight: 800;
//     margin-bottom: 0.5rem;
// }

// .left-panel-subtitle {
//     font-size: 1.125rem;
//     font-weight: 600;
//     margin-bottom: 1.5rem;
//     color: #bfdbfe; /* blue-200 */
// }

// .left-panel-description {
//     color: #dbeafe; /* blue-100 */
//     line-height: 1.6;
// }

// .left-panel-info {
//     margin-top: 2rem;
//     border-top: 1px solid #60a5fa; /* blue-400 */
//     padding-top: 1.5rem;
// }

// .info-title {
//     font-weight: 700;
// }

// .info-list {
//     list-style-position: inside;
//     list-style-type: disc;
//     margin-top: 0.5rem;
//     font-size: 0.875rem;
//     color: #bfdbfe; /* blue-200 */
// }

// .info-list li {
//     margin-bottom: 0.25rem;
// }

// /* --- Right Panel (Form) --- */
// .right-panel {
//     grid-column: span 1 / span 1;
//     background-color: white;
// }
// @media (min-width: 1024px) {
//     .right-panel {
//         grid-column: span 2 / span 2;
//     }
// }

// .form-header {
//     background-color: var(--brand-blue-dark);
//     color: white;
//     text-align: center;
//     padding: 1.5rem 2rem;
// }

// .form-title {
//     font-size: 1.5rem;
//     font-weight: 700;
// }

// .form-body {
//     padding: 2rem 2.5rem;
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
// }

// /* --- Form Elements --- */
// .form-fieldset {
//     border: none;
//     padding: 0;
//     margin: 0;
// }

// .fieldset-legend {
//     font-size: 1.25rem;
//     font-weight: 600;
//     color: var(--text-primary);
//     margin-bottom: 1rem;
//     padding-bottom: 0.5rem;
//     border-bottom: 1px solid #e5e7eb;
// }

// .form-grid {
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 1.5rem;
// }

// .form-grid-cols-2 {
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 1.5rem;
// }
// @media (min-width: 768px) {
//     .form-grid-cols-2 {
//         grid-template-columns: repeat(2, minmax(0, 1fr));
//     }
// }

// .form-label {
//     display: block;
//     margin-bottom: 0.5rem;
//     font-weight: 500;
//     color: var(--text-primary);
// }
// .form-label-sm {
//     display: block;
//     margin-bottom: 0.5rem;
//     font-weight: 500;
//     color: var(--text-primary);
//     font-size: 0.875rem;
// }

// .form-input, .form-select, .form-textarea, .form-input-sm {
//     width: 100%;
//     border: 1px solid #d1d5db;
//     border-radius: 0.5rem;
//     transition: all 0.2s ease;
//     box-sizing: border-box;
// }

// .form-input, .form-select, .form-textarea {
//     padding: 0.75rem;
// }

// .form-input-sm {
//     padding: 0.5rem;
//     border-radius: 0.375rem;
// }

// .form-input:focus, .form-select:focus, .form-textarea:focus,
// .form-input-sm:focus {
//     border-color: var(--brand-blue-primary);
//     box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
//     outline: none;
// }

// .form-textarea {
//     height: 10rem;
//     resize: vertical;
// }

// .form-select {
//     appearance: none;
//     background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
//     background-position: right 0.75rem center;
//     background-repeat: no-repeat;
//     background-size: 1.2em;
//     padding-right: 2.5rem;
// }

// .word-counter {
//     text-align: right;
//     font-size: 0.875rem;
//     color: var(--text-secondary);
//     margin-top: 0.25rem;
// }
// .word-counter.error {
//     color: var(--brand-red);
//     font-weight: 600;
// }

// /* --- Participants --- */
// #participantsContainer {
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;
// }
// .participant-block {
//     padding: 1rem;
//     border: 1px solid #e5e7eb;
//     border-radius: 0.5rem;
//     background-color: #f9fafb;
// }
// .participant-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 1rem;
// }
// .participant-title {
//     font-weight: 600;
//     color: #374151;
// }
// .participant-field-full {
//     grid-column: span 1 / span 1;
// }
// @media (min-width: 768px) {
//     .participant-field-full {
//         grid-column: span 2 / span 2;
//     }
// }

// /* --- Buttons --- */
// .btn {
//     padding: 0.75rem 1.5rem;
//     font-weight: 700;
//     border-radius: 0.5rem;
//     cursor: pointer;
//     border: none;
//     transition: background-color 0.2s ease;
//     width: 100%;
//     font-size: 1.125rem;
// }

// .btn-primary {
//     background-color: var(--brand-orange);
//     color: white;
// }
// .btn-primary:hover {
//     background-color: var(--brand-orange-dark);
// }

// .btn-add {
//     font-size: 0.875rem;
//     font-weight: 600;
//     background-color: var(--brand-blue-primary);
//     color: white;
//     padding: 0.5rem 1rem;
//     border-radius: 0.375rem;
//     width: auto;
// }
// .btn-add:hover {
//     background-color: #1565C0;
// }
// .btn-add:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
// }

// .btn-remove {
//     font-size: 0.875rem;
//     font-weight: 600;
//     color: var(--brand-red);
//     background: none;
//     border: none;
//     cursor: pointer;
// }
// .btn-remove:hover {
//     text-decoration: underline;
// }

// /* --- Modal --- */
// .modal-overlay {
//     position: fixed;
//     inset: 0;
//     background-color: rgba(0, 0, 0, 0.6);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 1rem;
//     z-index: 50;
// }

// .modal-content {
//     background-color: white;
//     border-radius: 1.5rem;
//     box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//     max-width: 32rem; /* 512px */
//     width: 100%;
//     padding: 2rem;
//     text-align: center;
//     position: relative;
// }

// .modal-close-btn {
//     position: absolute;
//     top: 1rem;
//     right: 1rem;
//     color: #9ca3af;
//     background: none;
//     border: none;
//     font-size: 1.875rem;
//     line-height: 1;
//     cursor: pointer;
// }
// .modal-close-btn:hover {
//     color: #374151;
// }

// .modal-icon-wrapper {
//     margin: auto;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 4rem;
//     width: 4rem;
//     border-radius: 9999px;
//     background-color: #d1fae5;
//     margin-bottom: 1rem;
// }

// .modal-icon {
//     height: 2rem;
//     width: 2rem;
//     color: #059669;
// }

// .modal-title {
//     font-size: 1.5rem;
//     font-weight: 700;
//     color: #111827;
// }

// .modal-description {
//     color: #4b5563;
//     margin-top: 0.5rem;
//     margin-bottom: 1.5rem;
// }

// .modal-data-preview {
//     text-align: left;
//     background-color: #f3f4f6;
//     padding: 1rem;
//     border-radius: 0.5rem;
//     font-size: 0.75rem;
//     overflow: auto;
//     max-height: 15rem;
//     white-space: pre-wrap;
//     word-break: break-all;
// }
// `;

// // Participant Input Component
// const ParticipantInput = ({ index, participant, handleParticipantChange, removeParticipant }) => (
//     <div className="participant-block">
//         <div className="participant-header">
//             <h4 className="participant-title">Participant {index + 1}</h4>
//             {index > 0 && (
//                 <button type="button" onClick={() => removeParticipant(index)} className="btn-remove">
//                     &times; Remove
//                 </button>
//             )}
//         </div>
//         <div className="form-grid-cols-2">
//             <div>
//                 <label className="form-label-sm">Full Name</label>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="John Doe"
//                     value={participant.name}
//                     onChange={(e) => handleParticipantChange(index, e)}
//                     className="form-input-sm"
//                     required
//                 />
//             </div>
//             <div>
//                 <label className="form-label-sm">Designation</label>
//                 <input
//                     type="text"
//                     name="designation"
//                     placeholder="e.g., Professor, Student"
//                     value={participant.designation}
//                     onChange={(e) => handleParticipantChange(index, e)}
//                     className="form-input-sm"
//                     required
//                 />
//             </div>
//             <div className="participant-field-full">
//                 <label className="form-label-sm">Organisation</label>
//                 <input
//                     type="text"
//                     name="organisation"
//                     placeholder="University or Company Name"
//                     value={participant.organisation}
//                     onChange={(e) => handleParticipantChange(index, e)}
//                     className="form-input-sm"
//                     required
//                 />
//             </div>
//             <div>
//                 <label className="form-label-sm">Email Address</label>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="john.doe@example.com"
//                     value={participant.email}
//                     onChange={(e) => handleParticipantChange(index, e)}
//                     className="form-input-sm"
//                     required
//                 />
//             </div>
//             <div>
//                 <label className="form-label-sm">Phone Number</label>
//                 <input
//                     type="tel"
//                     name="phone"
//                     placeholder="+91 98765 43210"
//                     value={participant.phone}
//                     onChange={(e) => handleParticipantChange(index, e)}
//                     className="form-input-sm"
//                     required
//                 />
//             </div>
//         </div>
//     </div>
// );

// // Main Registration Form Component
// const Register = () => {
//     const [participants, setParticipants] = useState([
//         { name: '', designation: '', organisation: '', email: '', phone: '' }
//     ]);
//     const [formData, setFormData] = useState({
//         address: '',
//         country: '',
//         pincode: '',
//         track: '',
//         abstractTitle: '',
//         abstractContent: '',
//         abstractExpression: ''
//     });
//     const [wordCount, setWordCount] = useState(0);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [submittedData, setSubmittedData] = useState(null);

//     const handleParticipantChange = (index, event) => {
//         const newParticipants = [...participants];
//         newParticipants[index][event.target.name] = event.target.value;
//         setParticipants(newParticipants);
//     };

//     const addParticipant = () => {
//         if (participants.length < 4) {
//             setParticipants([...participants, { name: '', designation: '', organisation: '', email: '', phone: '' }]);
//         }
//     };

//     const removeParticipant = (index) => {
//         const newParticipants = participants.filter((_, i) => i !== index);
//         setParticipants(newParticipants);
//     };

//     const handleFormChange = (event) => {
//         setFormData({ ...formData, [event.target.name]: event.target.value });
//     };

//     const handleAbstractChange = (event) => {
//         const content = event.target.value;
//         setFormData({ ...formData, abstractContent: content });
//         const words = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
//         setWordCount(words);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const finalData = {
//             participants,
//             ...formData
//         };
//         setSubmittedData(finalData);
//         setIsModalOpen(true);
//     };

//     return (
//         <React.Fragment>
//             <style>{componentStyles}</style>
//             <div className="main-container">
//                 {/* Left Panel */}
//                 <div className="left-panel">
//                     <div>
//                         <h1 className="left-panel-title">S3-ECBE' 2026</h1>
//                         <p className="left-panel-subtitle">Joint International Conference</p>
//                         <p className="left-panel-description">
//                             Welcome to the registration portal. Please fill out the form to secure your spot and submit your abstract for the conference.
//                         </p>
//                         <div className="left-panel-info">
//                             <p className="info-title">Key Information:</p>
//                             <ul className="info-list">
//                                 <li>You can register 1 to 4 participants.</li>
//                                 <li>An abstract submission is required.</li>
//                                 <li>Ensure all details are accurate before submitting.</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Panel (Form) */}
//                 <div className="right-panel">
//                     <div className="form-header">
//                         <h2 className="form-title">Conference Registration Form</h2>
//                     </div>

//                     <form onSubmit={handleSubmit} className="form-body">
//                         <fieldset className="form-fieldset">
//                             <legend className="fieldset-legend">Participant Details (1-4)</legend>
//                             <div id="participantsContainer">
//                                 {participants.map((p, index) => (
//                                     <ParticipantInput
//                                         key={index}
//                                         index={index}
//                                         participant={p}
//                                         handleParticipantChange={handleParticipantChange}
//                                         removeParticipant={removeParticipant}
//                                     />
//                                 ))}
//                             </div>
//                             <button type="button" onClick={addParticipant} className="btn btn-add" disabled={participants.length >= 4}>
//                                 + Add Another Participant
//                             </button>
//                         </fieldset>

//                         <fieldset className="form-fieldset">
//                             <legend className="fieldset-legend">Contact Information</legend>
//                             <div className="form-grid">
//                                 <div>
//                                     <label htmlFor="address" className="form-label">Mailing Address</label>
//                                     <textarea id="address" name="address" value={formData.address} onChange={handleFormChange} placeholder="Enter your full mailing address" className="form-textarea" required></textarea>
//                                 </div>
//                                 <div className="form-grid-cols-2">
//                                     <div>
//                                         <label htmlFor="country" className="form-label">Country</label>
//                                         <input type="text" id="country" name="country" value={formData.country} onChange={handleFormChange} placeholder="e.g., India" className="form-input" required />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="pincode" className="form-label">Pincode / Postal Code</label>
//                                         <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleFormChange} placeholder="e.g., 600001" className="form-input" required />
//                                     </div>
//                                 </div>
//                             </div>
//                         </fieldset>

//                         <fieldset className="form-fieldset">
//                             <legend className="fieldset-legend">Abstract Submission</legend>
//                             <div className="form-grid">
//                                 <div>
//                                     <label htmlFor="track" className="form-label">Conference Track</label>
//                                     <select id="track" name="track" value={formData.track} onChange={handleFormChange} className="form-select" required>
//                                         <option value="" disabled>Select a Conference Track...</option>
//                                         <option value="Track 1: Innovative and Sustainable Smart Technologies in Electrical Engineering">Track 1: Electrical Engineering</option>
//                                         <option value="Track 2: Innovative and Sustainable Smart Technologies in Communication Engineering">Track 2: Communication Engineering</option>
//                                         <option value="Track 3: Innovative and Sustainable Smart Technologies in Biomedical Engineering">Track 3: Biomedical Engineering</option>
//                                         <option value="Track 4: Innovative and Sustainable Smart Technologies in Computer Science and Multidisciplinary Applications">Track 4: Computer Science & Multidisciplinary</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="abstractTitle" className="form-label">Abstract Title</label>
//                                     <input type="text" id="abstractTitle" name="abstractTitle" value={formData.abstractTitle} onChange={handleFormChange} placeholder="Enter the title of your abstract" className="form-input" required />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="abstractContent" className="form-label">Abstract Content</label>
//                                     <textarea id="abstractContent" name="abstractContent" value={formData.abstractContent} onChange={handleAbstractChange} placeholder="Paste your abstract here..." className="form-textarea" required></textarea>
//                                     <p className={`word-counter ${wordCount > 300 ? 'error' : ''}`}>{wordCount} / 300 words</p>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="abstractExpression" className="form-label">Keywords</label>
//                                     <input type="text" id="abstractExpression" name="abstractExpression" value={formData.abstractExpression} onChange={handleFormChange} placeholder="e.g., Smart Grids, AI, Biomedical Sensors" className="form-input" required />
//                                 </div>
//                             </div>
//                         </fieldset>
                        
//                         <div>
//                             <button type="submit" className="btn btn-primary">
//                                 Submit Registration
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//                 {isModalOpen && (
//                     <div className="modal-overlay">
//                         <div className="modal-content">
//                             <button onClick={() => setIsModalOpen(false)} className="modal-close-btn">&times;</button>
//                             <div className="modal-icon-wrapper">
//                                 <svg className="modal-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                 </svg>
//                             </div>
//                             <h3 className="modal-title">Registration Submitted!</h3>
//                             <p className="modal-description">Thank you for registering. Please review the data we received:</p>
//                             <pre className="modal-data-preview">{JSON.stringify(submittedData, null, 2)}</pre>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </React.Fragment>
//     );
// };

// export default Register;