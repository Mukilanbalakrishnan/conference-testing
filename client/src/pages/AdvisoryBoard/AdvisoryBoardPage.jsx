import React, { useEffect, useRef } from 'react';
import './AdvisoryBoardPage.css';

const AdvisoryBoardPage = () => {
    const NationalAdvisory = [
    { 
        name: 'Dr. N. Sivakumaran', 
        role: 'Professor', 
        department: 'Instrumentation and Control Engineering', 
        institution: 'National Institute of Technology, Tiruchirappalli' 
    },
    { 
        name: 'Dr. S. Poonguzhali', 
        role: 'Professor', 
        department: 'Medical Electronics', 
        institution: 'Anna University, Chennai' 
    },
    { 
        name: 'Dr. G. Kulanthaivel', 
        role: 'Professor', 
        department: 'Electronics and Communication Engineering', 
        institution: 'National Institute of Technical Teachers Training and Research' 
    },
    { 
        name: 'Dr. P. Abdul Rasheed', 
        role: 'Professor', 
        department: 'Biological Science and Engineering', 
        institution: 'Indian Institute of Technology, Palakkad' 
    },
    { 
        name: 'Dr. M. Iyapparaja', 
        role: 'HoD & Professor', 
        department: 'Department of Smart computing', 
        institution: 'Vellore Institute of Technology,Vellore' 
    },
    { 
        name: 'Dr. Rijo Jackson Tom', 
        role: 'Principal Data Scientist', 
        department: 'Information Technology', 
        institution: 'Augusta Hitech Soft Solutions, Rathinam Tech Zone, Coimbatore' 
    },
    { 
        name: 'Dr. S. Moorthi', 
        role: 'Associate Professor', 
        department: 'Electrical and Electronics Engineering', 
        institution: 'National Institute of Technology, Tiruchirappalli' 
    },
    { 
        name: 'Dr. W. Wilfred Godfrey', 
        role: 'Associate Professor', 
        department: 'Department of Electronics and Communication Engineering', 
        institution: 'Indian Institute of Technology and Management, Gwalior' 
    },
    { 
        name: 'Dr. S. Janakiraman', 
        role: 'Associate Professor', 
        department: 'Department of Banking Technology, School of Management', 
        institution: 'Pondicherry University, Pondicherry'
    },
    { 
        name: 'Dr. P.Damodharan', 
        role: 'Associate Professor', 
        department: 'Department of Electronics and Communication Engineering', 
        institution: 'Indian Institute of Information Technology, Design & Manufacturing (IIITD&M), Kancheepuram' 
    },
    { 
        name: 'Dr. Vijayakumar Krishnasamy', 
        role: 'Associate Professor', 
        department: 'Department of ECE', 
        institution: 'Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram' 
    },
    { 
        name: 'Dr.N.P. Subramanian', 
        role: 'Associate Professor', 
        department: 'Department of EEE', 
        institution: 'Puducherry Technological University,Pondicherry' 
    },
    { 
        name: 'Dr. Bharatiraja C', 
        role: 'Professor', 
        department: 'Faculty of Engineering & Technology', 
        institution: 'SRM Institute of Science and Technology,Chennai' 
    },
    { 
    name: 'Prof.P Somasundaram', 
    role: 'Professor', 
    department: 'Electrical and Electronics Engineering', 
    institution: 'Anna University, Chennai' 
},
{ 
    name: 'Prof.A. Kirubakaran', 
    role: 'Associate Professor', 
    department: 'Department of Electrical Engineering', 
    institution: 'NIT, Warangal' 
},

];

    const InternationalAdvisory = [
        {
        name: 'Dr. H.J. Ahmad Rashidy Razali',
        role: 'Professor, Software Embedded',
        department: 'Electronics and Communication Engineering',
        institution: 'Universiti Teknologi MARA (UiTM), Shah Alam, Malaysia'
    },
    {
        name: 'Dr. Abid Yahya',
        role: 'Associate Professor',
        department: 'Computer, Electrical & Telecommunications Engineering',
        institution: 'Botswana International University of Science and Technology, Palapye, Botswana'
    },
    
    // Data from image_8a8df2.png
    {
        name: 'Dr. Wan Suhaimizan Bin W',
        role: 'Professor',
        department: 'Faculty of Electrical and Electronics Engineering',
        institution: 'Universiti Tun Hussein Onn Malaysia, Johor, Malaysia'
    },
    {
        name: 'Dr. Ashok Vajravelu',
        role: 'Professor',
        department: 'Faculty of Electrical and Electronics Engineering',
        institution: 'Universiti Tun Hussein Onn Malaysia, Johor, Malaysia'
    },
    {
        name: 'Dr. Ariffuddin Bin Joret',
        role: 'Professor',
        department: 'Faculty of Electrical and Electronics Engineering',
        institution: 'Universiti Tun Hussein Onn Malaysia, Johor, Malaysia'
    },
    {
        name: 'Dr. Nitin Williams',
        role: 'Adjunct Professor',
        department: 'Department of Neuroscience & Biomedical Engineering',
        institution: 'Aalto University, Espoo, Finland'
    },
    {
        name: 'Dr. Dinesh Kumar',
        role: 'Professor',
        department: 'School of Electrical and Computer Engineering',
        institution: 'RMIT University, Melbourne, Australia'
    },
    { 
        name: 'Dr. Muhammad H Rashid', 
        role: 'Professor', 
        department: 'Electrical and Computer Engineering', 
        institution: 'University of West Florida, USA' 
    },
    { 
        name: 'Dr. Saad Mekhilef', 
        role: 'Professor', 
        department: 'Electrical Engineering', 
        institution: 'University of Malaysia, Malaysia' 
    },
    { 
        name: 'Dr. Jens Bo Holm Nielsen', 
        role: 'Emeritus Associate Professor', 
        department: 'Faculty of Engineering and Science', 
        institution: 'Aalborg University, Denmark' 
    },
    { 
        name: 'Dr. Atsuo Kawamura', 
        role: 'Professor', 
        department: 'Electrical and Computer Engineering', 
        institution: 'Yokohama National University, Japan' 
    },
    { 
        name: 'Dr. Murugappan M', 
        role: 'Professor', 
        department: 'Electronics & Communications Engineering', 
        institution: 'Kuwait College of Science and Technology, Kuwait' 
    },
    {
        name: 'Brindha Venkateswaran',
        role: 'Engineer',
        department: 'Automotive R&D Department',
        institution: 'Aumovio, Singapore'
    },
    {
        name: 'Gunasekaran Thangavel',
        role: 'Professor',
        department: 'Electronics and Communication Engineering',
        institution: 'University of Technology and Applied Sciences, Muscat, Oman'
    },
    {
        name: 'Akhtar Kalam',
        role: 'Professor',
        department: 'Head of External Engagement, Leader - Smart Energy Research Unit',
        institution: 'College of Engineering and Science, Victoria University, Australia'
    },

    ];

    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        const sections = sectionRef.current.querySelectorAll('.page-header, .board-member-card');
        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);


    return (
        <main className="advisory-board" ref={sectionRef}>
            {/* National Advisory */}
            <header className="page-header">
                <div className="container">
                    <h1>National Advisory Committee</h1>
                </div>
            </header>

            <div className="container">
                <div className="board-grid">
                    {NationalAdvisory.map((member, index) => (
                        <div className="board-member-card" key={index}>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            <div className="member-institution">
                                <p className="institution-line">
                                    <span className="institution-department">{member.department}</span>
                                </p>
                                <p className="institution-line">
                                    {member.institution}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* International Advisory */}
            <header className="page-header">
                <div className="container">
                    <h1>International Advisory Committee</h1>
                </div>
            </header>

            <div className="container">
                <div className="board-grid">
                    {InternationalAdvisory.map((member, index) => (
                        <div className="board-member-card" key={index}>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            <div className="member-institution">
                                <p className="institution-line">
                                    <span className="institution-department">{member.department}</span>
                                </p>
                                <p className="institution-line">
                                    {member.institution}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AdvisoryBoardPage;

