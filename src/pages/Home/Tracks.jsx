    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import './Tracks.css';

    // --- Main Page Component ---
    const Tracks = () => {
        const navigate = useNavigate();
        const [activeItem, setActiveItem] = useState(0); 

        const handleItemClick = (index) => {
            setActiveItem(activeItem === index ? null : index);
        };

        const scheduleData = [
            {
                dayLabel: { day: 'Thursday', date: '26.03.2026' },
                events: [
                    { id: 'track1', time: '11:30 - 1:00', title: 'Innovative and Sustainable Smart Technologies in Electrical Engineering', description: 'Focuses on smart grids, renewable energy integration, and energy-efficient electrical systems.' },
                    { id: 'track2', time: '2:00 - 4:00', title: 'Innovative and Sustainable Smart Technologies in Communication Engineering', description: 'Covers energy-efficient wireless systems, 5G/6G connectivity, and smart IoT networks.' },
                ],
            },
            {
                dayLabel: { day: 'Friday', date: '27.03.2025' },
                events: [
                    { id: 'track3', time: '11:30 - 1:00', title: 'Innovative and Sustainable Smart Technologies in Biomedical Engineering', description: 'Explores smart biomedical devices, AI-powered diagnostics, and IoT-enabled healthcare.' },
                    { id: 'track4', time: '2:00 - 4:00', title: 'Innovative and Sustainable Smart Technologies in Computer Science', description: 'Highlights green computing, sustainable AI, and smart data analytics for societal impact.' },
                ],
            },
        ];

        return (
            <main>
                <section className="tracks-section">
                    <div className="container">
                        <div className="tracks-header">
                            <p className="kicker">// CONFERENCE TRACKS</p>
                            <h2>Explore the Conference Themes</h2>
                        </div>

                        <div className="tracks-layout">
                            {scheduleData.map((dayGroup, groupIndex) => (
                                <div 
                                    className="day-schedule-group" 
                                    key={groupIndex}
                                    // ADDED THIS DATA ATTRIBUTE FOR MOBILE VIEW
                                    data-day={`${dayGroup.dayLabel.day} - ${dayGroup.dayLabel.date}`}
                                >
                                    <div className="date-tab">
                                        <span>{dayGroup.dayLabel.day}</span>
                                        <span className="tab-text">{dayGroup.dayLabel.date}</span>
                                    </div>
                                    <div className="events-list">
                                        {dayGroup.events.map((event, eventIndex) => {
                                            const uniqueIndex = groupIndex * 10 + eventIndex;
                                            return (
                                                <div 
                                                    className={`event-card ${activeItem === uniqueIndex ? 'open' : ''}`} 
                                                    key={event.id}
                                                    onClick={() => handleItemClick(uniqueIndex)}
                                                >
                                                    <div className="event-header">
                                                        <div className="event-info">
                                                            <div className="event-time">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/></svg>
                                                                <span>{event.time}</span>
                                                            </div>
                                                            <h3>{event.title}</h3>
                                                        </div>
                                                        <button className="expand-button" aria-label="More details">+</button>
                                                    </div>
                                                    <div className="event-description">
                                                        <p>{event.description}</p>
                                                        <button className="view-more-btn" onClick={(e) => { e.stopPropagation(); navigate("/conferencetrack"); }}>
                                                            View More
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        );
    };

    export default Tracks;




