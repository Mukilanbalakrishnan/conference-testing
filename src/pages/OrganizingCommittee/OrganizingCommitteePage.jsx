import React, { useState, useEffect, useRef } from 'react';
import './OrganizingCommitteePage.css';
import { FaUsers, FaBook, FaMoneyBill, FaClipboardList, FaHotel, FaChevronDown, FaLaptopCode } from 'react-icons/fa';

const OrganizingCommitteePage = () => {
    const committeeData = [
        { 
            id: 'publication', 
            name: 'Publication Chair(s)', 
            icon: <FaBook />,
            members: [
                { name: 'Ms. P.Thilagavathi', role: 'Associate Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. S. Premalatha', role: 'Associate Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. S. Dhivagar', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. M. Subramani', role: 'Assistant Professor, EEE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. B.B. Sangamaeswaren', role: 'Assistant Professor, BME', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Ms. V.D. Nandhini', role: 'Assistant Professor, BME', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'local', 
            name: 'Local Organizing Committee', 
            icon: <FaUsers />,
            members: [
                { name: 'Dr. P. Mahendharan', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. P. Sivashankar Rajamani', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. J. Ganesh Moorthy', role: 'Assistant Professor, EEE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. P.J. Ragu', role: 'Assistant Professor, BME', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'finance', 
            name: 'Finance / Sponsorship Committee', 
            icon: <FaMoneyBill />,
            members: [
                { name: 'Mr. K. Karuppanasamy', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mrs. P. Usha', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. M. Vijayakumar', role: 'Assistant Professor, EEE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. SS. Parameswaren', role: 'Assistant Professor, BME', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'registration', 
            name: 'Registration Committee', 
            icon: <FaClipboardList />,
            members: [
                { name: 'Ms. B. Latha', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mrs. M. Dharani', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. S. Senthil Kumar', role: 'Assistant Professor, EEE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. E. Vani', role: 'Associate Professor, EEE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mrs. M. Brindha', role: 'Assistant Professor, BME', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'hospitality', 
            name: 'Hospitality & Accommodation Committee', 
            icon: <FaHotel />,
            members: [
                { name: 'Dr. K.P. Uvarajan', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. T.M. Sathishkumar', role: 'Assistant Professor, ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Ms. V.D. Nandhini', role: 'Assistant Professor, BME', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mrs. A. Vasanthi', role: 'Assistant Professor, EEE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'development', 
            name: 'Site Developer Team (Fleopix.com)', 
            icon: <FaLaptopCode />, // Changed Icon
            members: [
                { name: 'M. Hariharan', role: 'Final Year - ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'V.H. Vasudhan', role: 'Final Year - ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'B. Mukilan', role: 'Final Year - IT', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'M. Kaviyarasan', role: 'Final Year - ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'C. BarathKumar', role: 'Final Year - ECE', institution: ' K.S.R College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        }
    ];

    const [activeCommittee, setActiveCommittee] = useState(committeeData[0].id);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const detailRefs = useRef({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveCommittee(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 } // Adjusted bottom margin
        );

        const refs = detailRefs.current;
        Object.values(refs).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            Object.values(refs).forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);
    
    const handleNavClick = (id) => {
        setIsMobileMenuOpen(false);
        const targetElement = detailRefs.current[id];
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            // Directly set active state to avoid lag from observer
            setActiveCommittee(id);
        }
    };
    
    const getActiveCommitteeName = () => {
        const active = committeeData.find(item => item.id === activeCommittee);
        return active ? active.name : "Select a Committee";
    };

    return (
        <main className="organizingCommitteePage">
            <header className="page-header">
                <div className="container">
                    <h1>Organizing Committee</h1>
                </div>
            </header>

            <div className="container committee-layout">
                {/* Mobile Dropdown Navigation */}
                <div className="mobile-nav-toggle">
                    <button 
                        className="mobile-dropdown-trigger"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span>{getActiveCommitteeName()}</span>
                        <FaChevronDown className={`dropdown-chevron ${isMobileMenuOpen ? 'open' : ''}`} />
                    </button>
                    
                    <div className={`mobile-nav-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
                        {committeeData.map(item => (
                            <a 
                                key={item.id}
                                href={`#${item.id}`}
                                className={`mobile-nav-link ${activeCommittee === item.id ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Left Side Navigation (Desktop) */}
                <nav className="committee-nav">
                    <h2>Committee Teams</h2>
                    <ul>
                        {committeeData.map(item => (
                            <li key={item.id}>
                                <a 
                                    href={`#${item.id}`}
                                    className={`nav-link ${activeCommittee === item.id ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Side Content */}
                <div className="committee-details">
                    {committeeData.map(item => (
                        <section 
                            id={item.id} 
                            key={item.id}
                            ref={el => detailRefs.current[item.id] = el}
                            className="detail-card"
                        >
                            <h3 className="detail-title">{item.icon} {item.name}</h3>
                            <div className="member-grid">
                                {item.members.map((member, i) => (
                                    <div key={i} className="member-item">
                                        <strong>{member.name}</strong>
                                        <span className="role">{member.role}</span>
                                        <span className="institution">{member.institution}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default OrganizingCommitteePage;

