import React, { useState } from 'react';
import './ConferenceTracksPage.css'; 

const ConferenceTracksPage = () => {
    const allTracksData = [
        {
            id: 1,
            title: "Track 1: Computer Science & Multidisciplinary Applications",
            shortSummary: "Covers sustainable computing, from energy-efficient algorithms and AI for societal impact to green cloud computing and IoT systems for a wide range of smart solutions.",
            longSummary: "This track investigates the transformative role of computer science in fostering sustainable, intelligent, and multidisciplinary innovations. Discussions highlight energy-efficient algorithms, green computing architectures, and the development of sustainable AI and machine learning methods that reduce computational overhead while maximizing impact. Smart data analytics is showcased as a driver for societal and environmental advancements, with applications ranging from healthcare and energy to smart cities. The track also covers sustainable cloud computing and energy-conscious data centers, as well as IoT and cyber-physical systems designed for large-scale sustainability challenges. Research on human-computer interaction emphasizes user-friendly, inclusive, and sustainable digital experiences, while automation, robotics, and blockchain technologies demonstrate their potential in creating secure, efficient, and future-proof industries. The multidisciplinary integration of computer science with biomedical, electrical, and communication technologies underscores this track’s vision of fostering holistic and sustainable solutions for global challenges.",
            speaker: "Dr. Malathy Batumalay",
            speakerAbout: "Associate professor in photonics engineering, specializing in fiber-optic sensors, lasers, and plasmonic sensors for environmental applications",
            speakerImage: "https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754148/nvbpdwncdrxpekuksahy.webp",
            date: "March 26, 2026",
            time: "11:30 AM - 1:00 PM",
            styleClass: "track-indigo",
        },
        {
            id: 2,
            title: "Track 2: Electrical Engineering",
            shortSummary: "Focuses on innovative and sustainable smart technologies, covering everything from smart grids and renewable energy to electrical machine drives and electric vehicles.",
            longSummary: 'This track explores the transformation of electrical engineering through sustainable and intelligent technologies. It emphasizes the design and deployment of smart grids and microgrids, enabling more resilient and adaptive energy systems. The track highlights renewable energy integration, from solar and wind to hybrid solutions, supported by advanced energy storage technologies that ensure reliability and efficiency. Power electronics play a pivotal role in enhancing energy conversion and utilization, while smart metering and demand-response strategies enable optimized energy distribution. Sessions also focus on energy-efficient electrical machines and drives, system automation, and the application of IoT and AI for intelligent control. Moreover, sustainable materials, manufacturing practices, and innovations in electric vehicles and charging infrastructure are addressed, positioning this track as a hub for forward-looking discussions on achieving global energy sustainability.',
            speaker: "Dr. Sathish Kumar Selvaperumal",
            speakerAbout: "Senior engineering professor with expertise in image & speech processing, AI, biomedical applications, wireless communication, IoT & robotics, contributing to sustainable technology research.",
            speakerImage: "https://res.cloudinary.com/dllbh1v1m/image/upload/v1757413874/wwr3oyysqlzuxeomkobj.webp",
            date: "March 26, 2026",
            time: "2:00 PM - 4:00 PM",
            styleClass: "track-teal",
        },
        {
            id: 3,
            title: "Track 3: Communication Engineering",
            shortSummary: "Explores next-generation communication systems, including energy-efficient 5G/6G networks, smart IoT sensors, and the use of AI for network optimization and security.",
            longSummary:"This track addresses the role of communication engineering in driving sustainability and innovation in next-generation networks. Central to the discussions are energy-efficient wireless systems, green networking practices, and sustainable communication protocols designed to reduce the carbon footprint of digital connectivity. Researchers and practitioners explore smart IoT and sensor networks tailored for sustainable applications, as well as advancements in 5G, 6G, and beyond that enable low-latency, high-capacity, and environmentally conscious connectivity. Cognitive radio and spectrum management strategies ensure efficient use of resources, while AI and machine learning empower optimized communication infrastructures. Special attention is given to low-power communication hardware, sustainable network architectures, and communication technologies for smart cities. Security and privacy challenges in sustainable communication systems are also examined, ensuring robust and responsible deployment of future-ready communication solutions.",
            speaker: "Dr. Sandipan Mallik",
            speakerAbout: "Associate Professor at NIST University, Odisha, whose research spans thin-film physics, high-k dielectrics, MOS/MIM capacitors, SiGe heterostructures, photovoltaic devices and nano/microelectronics fabrication.",
            speakerImage: "https://res.cloudinary.com/dllbh1v1m/image/upload/v1755757219/sgphhfiniml8lavztk6w.jpg",
            date: "March 27, 2026",
            time: "11:30 AM - 1:00 PM",
            styleClass: "track-amber",
        },
        {
            id: 4,
            title: "Track 4: Biomedical Engineering",
            shortSummary: "Presents smart, sustainable solutions for healthcare, from energy-efficient devices and wearable monitors to AI-driven diagnostics. This track bridges the gap between engineering and medicine to create a healthier future. Join us to see how technology is creating a healthier, more sustainable world.",
            longSummary: "This track focuses on the convergence of biomedical engineering with sustainability and smart technologies to revolutionize healthcare delivery and patient well-being. Key discussions revolve around energy-efficient biomedical devices, smart wearable health monitoring systems, and advanced biomedical signal processing methods designed to reduce resource consumption while enhancing diagnostic accuracy. AI and machine learning applications are emphasized for predictive healthcare, precision medicine, and automated diagnostics. The track also explores innovations in low-power implantable and portable devices, sustainable materials and manufacturing for biomedical products, and telemedicine solutions that expand access to healthcare services. Additional themes include smart prosthetics, rehabilitation systems, and biomedical data analytics for improved healthcare outcomes. The integration of IoT in healthcare systems is underscored as a pathway toward smart, connected, and sustainable healthcare ecosystems that prioritize accessibility, efficiency, and environmental responsibility.",
            speaker: "Dr N Sivakumaran",
            speakerAbout: "Professor in the Department of Instrumentation & Control Engineering at NIT Tiruchirappalli, specializing in process control, industrial automation, machine learning, and biomedical instrumentation.",
            speakerImage: "https://res.cloudinary.com/dllbh1v1m/image/upload/v1757477854/ooo46qnl2b6qg5zbvdn7.jpg",
            date: "March 27, 2026",
            time: "2:00 PM - 4:00 AM",
            styleClass: "track-slate",
        }
        
    ];

    const [selectedTrack, setSelectedTrack] = useState(null);

    const handleViewDetails = (track) => {
        setSelectedTrack(track);
    };

    const handleCloseModal = () => {
        setSelectedTrack(null);
    };

    return (
        <div className="ctp-tracks-page-container">
            <div className="ctp-tracks-content-wrapper">
                <header className="ctp-tracks-page-header">
                    <h1>Conference Tracks</h1>
                    <p>Explore the diverse themes and sessions that form the core of our conference.</p>
                </header>

                <div className="ctp-tracks-grid">
                    {allTracksData.map((track) => (
                        <div key={track.id} className={`ctp-track-card ${track.styleClass}`}>
                            <div className="ctp-track-content">
                                <h2 className="ctp-track-title">{track.title}</h2>
                                <p className="ctp-track-summary">{track.shortSummary}</p>
                                <div className="ctp-buttons-row">
                                    <a href={"/register"} className="ctp-btn ctp-btn-primary">
                                        Register Now
                                    </a>
                                    <button onClick={() => handleViewDetails(track)} className="ctp-btn ctp-btn-secondary">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedTrack && (
                <div className="ctp-modal-overlay" onClick={handleCloseModal}>
                    <div
                        className={`ctp-track-detail-card ${selectedTrack.styleClass}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="ctp-modal-header">
                            <h1 className="ctp-track-main-title">{selectedTrack.title}</h1>
                            <button className="ctp-modal-close-btn" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>

                        <div className="ctp-modal-scroll-content">
                            <div className="ctp-track-meta-section">
                                <div className="ctp-speaker-info">
                                    <img
                                        src={selectedTrack.speakerImage}
                                        alt={selectedTrack.speaker}
                                        className="ctp-speaker-image"
                                    />
                                    <div className="ctp-speaker-details">
                                        <h2 className="ctp-speaker-name">{selectedTrack.speaker}</h2>
                                        <p className="ctp-speaker-about">{selectedTrack.speakerAbout}</p>
                                    </div>
                                </div>
                                <div
                                    className="ctp-session-time"
                                >
                                    <p><strong>Date:</strong> {selectedTrack.date}</p>
                                    <p><strong>Time:</strong> {selectedTrack.time}</p>
                                </div>
                            </div>

                            <div className="ctp-track-summary-content">
                                <h3>Session Overview</h3>
                                <p>{selectedTrack.longSummary}</p>
                            </div>
                        </div>

                        <div className="ctp-modal-footer">
                            <a
                                href={'/register'}
                                className="ctp-btn ctp-btn-primary"
                            >
                                Register Now
                            </a>
                            <button className="ctp-btn ctp-btn-secondary" onClick={handleCloseModal}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConferenceTracksPage;

