import React, { useEffect, useRef } from 'react';
import './Researchandreview.css';

const Researchandreview = () => {
    const boardMembers = [
        { name: 'Dr.R. Poornima', role: 'Assistant Professor', affiliation: 'Electronics and Communication Engineering, K.S.R College of Engineering, Tiruchengode, Tamilnadu India' },
        { name: 'Mr.R. Veeramani', role: 'Assistant Professor', affiliation: 'Electronics and Communication Engineering, K.S.R College of Engineering, Tiruchengode, Tamilnadu India' },
        { name: 'Dr.M. Vijayakumar', role: 'Assistant Professor', affiliation: 'Electrical and Electronics Engineering, K.S.R College of Engineering, Tiruchengode, Tamilnadu India' },
        { name: 'Dr.M. Ramasamy', role: 'Associate Professor', affiliation: 'Electrical and Electronics Engineering, K.S.R College of Engineering, Tiruchengode, Tamilnadu India' },
        { name: 'Dr. Zuraidah Harith', role: 'Associate Professor', affiliation: 'Faculty of Engineering and Quantity Surveying, INTI International University, Malaysia' },
        { name: 'Ts. Dr. Siti Sarah Maidin', role: 'Professor', affiliation: 'Faculty of Data Science and Information Technology (FDSIT), INTI International University, Malaysia' },
        { name: 'Ts. Dr. Jeya Gopi Raman', role: 'Professor', affiliation: 'Faculty of Engineering & Quantity Surveying, INTI International University, Malaysia' },
        { name: 'Mr.B.B. Sangameswaran', role: 'Assistant Professor', affiliation: 'Biomedical Engineering, K.S.R College of Engineering, Tiruchengode, Tamilnadu India' }
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
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            const cards = currentRef.querySelectorAll('.board-member-card');
            cards.forEach(card => observer.observe(card));
        }

        return () => {
            if (currentRef) {
                const cards = currentRef.querySelectorAll('.board-member-card');
                cards.forEach(card => observer.unobserve(card));
            }
        };
    }, []);

    // Helper function to format institution text
    const formatInstitution = (text) => {
        if (!text) return null;
        const parts = text.split(',');
        const department = parts[0];
        const institution = parts.slice(1).join(',');
        return (
            <>
                <p className="institution-department">{department}</p>
                <p className="institution-line">{institution}</p>
            </>
        );
    };

    return (
        <main ref={sectionRef} className="researchandreview">
            <header className="page-header">
                <div className="container">
                    <h1>Editorial and Review Board</h1>
                </div>
            </header>

            <div className="container">
                <div className="board-grid">
                    {boardMembers.map((member, index) => (
                        <div
                            className="board-member-card"
                            key={index}
                            style={{ transitionDelay: `${0.05 * index}s` }}
                        >
                            <h3 className="member-name">{member.name}</h3>
                            {member.role && <p className="member-role">{member.role}</p>}
                            <div className="member-institution">
                                {formatInstitution(member.affiliation)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Researchandreview;

