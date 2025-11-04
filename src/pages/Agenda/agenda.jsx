

// import React, { useState, useEffect } from 'react';
// import './agenda.css'; // Your new stylesheet
// import { FaRegCheckCircle, FaClock, FaMapMarkerAlt, FaUsers, FaMugHot, FaAward, FaBroadcastTower } from 'react-icons/fa';

// // --- Countdown Timer Component (No changes needed here) ---
// const Countdown = ({ targetDate }) => {
//     const calculateTimeLeft = () => {
//         const difference = +new Date(targetDate) - +new Date();
//         let timeLeft = {};
//         if (difference > 0) {
//             timeLeft = {
//                 Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//                 Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//                 Minutes: Math.floor((difference / 1000 / 60) % 60),
//                 Seconds: Math.floor((difference / 1000) % 60),
//             };
//         }
//         return timeLeft;
//     };
//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
//     useEffect(() => {
//         const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
//         return () => clearTimeout(timer);
//     });
//     return (
//         <div className="agenda-countdown-container">
//             {Object.keys(timeLeft).length > 0 ? (
//                 Object.entries(timeLeft).map(([unit, value]) => (
//                     <div className="agenda-countdown-item" key={unit}>
//                         <span className="agenda-countdown-number">{String(value).padStart(2, '0')}</span>
//                         <span className="agenda-countdown-label">{unit}</span>
//                     </div>
//                 ))
//             ) : (
//                 <span className="agenda-conference-live">The Conference is Live!</span>
//             )}
//         </div>
//     );
// };

// // --- Main Agenda Page Component ---
// const Agenda = () => {
//     const [activeTab, setActiveTab] = useState('day1');
//     const [isFading, setIsFading] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());

//     useEffect(() => {
//         const interval = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
//         return () => clearInterval(interval);
//     }, []);

//     const scheduleData = {
//         day1: {
//             date: '2026-03-26',
//             events: [
//                 { startTime: '10:00', endTime: '10:45', title: 'Inaguration', icon: <FaMugHot />,venue: 'Platinum Hall' },
//                 { startTime: '10:45', endTime: '11:30', title: 'Keynote Speaker', icon: <FaUsers />, venue: 'Platinum Hall' },
//                 { startTime: '11:30', endTime: '01:00', title: 'Track Session', icon: <FaMugHot />, venue: 'Platinum Hall' },
//                 { startTime: '01:00', endTime: '02:00', title: 'Lunch', icon: <FaUsers />, venue: 'Himalayan Hostal' },
//                 { startTime: '02:00', endTime: '04:00', title: 'Parallel Session', icon: <FaUsers />, venue: 'Platinum Hall' },
//                 // { startTime: '20:30', endTime: '21:30', title: 'Evening Social & Mixer', icon: <FaUsers />, venue: 'Rooftop Lounge' },
//             ],
//         },
//         day2: {
//             date: '2026-03-27',
//             events: [
//                 { startTime: '10:00', endTime: '10:45', title: 'Inaguration', icon: <FaMugHot />,venue: 'Platinum Hall' },
//                 { startTime: '10:45', endTime: '11:30', title: 'Keynote Speaker', icon: <FaUsers />, venue: 'Platinum Hall' },
//                 { startTime: '11:30', endTime: '01:00', title: 'Track Session', icon: <FaMugHot />, venue: 'Platinum Hall' },
//                 { startTime: '01:00', endTime: '02:00', title: 'Lunch', icon: <FaUsers />, venue: 'Himalayan Hostal' },
//                 { startTime: '02:00', endTime: '04:00', title: 'Parallel Session', icon: <FaUsers />, venue: 'Platinum Hall' },
//             ],
//         },
//     };

//     const getEventStatus = (eventDate, startTime, endTime) => {
//         const startDateTime = new Date(`${eventDate}T${startTime}:00`);
//         const endDateTime = new Date(`${eventDate}T${endTime}:00`);
//         if (currentTime > endDateTime) return 'completed';
//         if (currentTime >= startDateTime && currentTime <= endDateTime) return 'in-progress';
//         return 'upcoming';
//     };

//     const handleTabClick = (tab) => {
//         if (tab === activeTab) return;
//         setIsFading(true);
//         setTimeout(() => {
//             setActiveTab(tab);
//             setIsFading(false);
//         }, 300);
//     };

//     const activeDay = scheduleData[activeTab];
//     const countdownTarget = `${scheduleData.day1.date}T${scheduleData.day1.events[0].startTime}:00`;

//     return (
//         <main className="agenda-page">
//             <section className="agenda-hero">
//                 <div className="agenda-container">
//                     <h1 className="agenda-hero-title">Conference Agenda</h1>
//                     <p className="agenda-hero-subtitle">Explore our detailed schedule and plan your days. The future awaits!</p>
//                     <Countdown targetDate={countdownTarget} />
//                 </div>
//             </section>

//             <div className="agenda-container agenda-schedule-container">
//                 <div className="agenda-tabs">
//                     <button className={`agenda-tab-btn ${activeTab === 'day1' ? 'active' : ''}`} onClick={() => handleTabClick('day1')}>Day 1: March 26, 2026</button>
//                     <button className={`agenda-tab-btn ${activeTab === 'day2' ? 'active' : ''}`} onClick={() => handleTabClick('day2')}>Day 2: March 27, 2026</button>
//                 </div>

//                 <div className={`agenda-grid-content ${isFading ? 'fading' : ''}`}>
//                     <div className="agenda-grid" key={activeTab}>
//                         {activeDay.events.map((event, index) => {
//                             const status = getEventStatus(activeDay.date, event.startTime, event.endTime);
//                             return (
//                                 <div
//                                     className={`agenda-grid-item ${status}`}
//                                     key={index}
//                                     style={{ animationDelay: `${index * 0.1}s` }}
//                                 >
//                                     <div className="agenda-time-slot">
//                                         <div className="agenda-time">{event.startTime}</div>
//                                         <div className="agenda-time-connector"></div>
//                                     </div>
//                                     <div className="agenda-card">
//                                         <div className="agenda-card-header">
//                                             <div className="agenda-icon">{event.icon}</div>
//                                             <div className="agenda-title-group">
//                                                 <h4 className="agenda-event-title">{event.title}</h4>
//                                                 <p className="agenda-event-duration"><FaClock /> {event.startTime} - {event.endTime}</p>
//                                             </div>
//                                             {status === 'in-progress' && <span className="agenda-live-badge"><FaBroadcastTower /> LIVE</span>}
//                                             {status === 'completed' && <span className="agenda-completed-badge"><FaRegCheckCircle /> Done</span>}
//                                         </div>
//                                         {event.venue && <p className="agenda-event-venue"><FaMapMarkerAlt /> {event.venue}</p>}
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default Agenda;





import React, { useState, useEffect } from 'react';
import './agenda.css'; // Your new stylesheet
import { 
    FaRegCheckCircle, FaClock, FaMapMarkerAlt, FaUsers, FaMugHot, FaAward, 
    FaBroadcastTower, FaTrophy, FaUserTie, FaClipboardList, FaUtensils, FaProjectDiagram 
} from 'react-icons/fa';

// --- Countdown Timer Component (No changes needed here) ---
const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Minutes: Math.floor((difference / 1000 / 60) % 60),
                Seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });
    return (
        <div className="agenda-countdown-container">
            {Object.keys(timeLeft).length > 0 ? (
                Object.entries(timeLeft).map(([unit, value]) => (
                    <div className="agenda-countdown-item" key={unit}>
                        <span className="agenda-countdown-number">{String(value).padStart(2, '0')}</span>
                        <span className="agenda-countdown-label">{unit}</span>
                    </div>
                ))
            ) : (
                <span className="agenda-conference-live">The Conference is Live!</span>
            )}
        </div>
    );
};

// --- Main Agenda Page Component ---
const Agenda = () => {
    const [activeTab, setActiveTab] = useState('day1');
    const [isFading, setIsFading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const scheduleData = {
        day1: {
            date: '2026-03-26',
            events: [
                // MODIFIED: Icons changed to match events
                { startTime: '10:00', endTime: '10:45', title: 'Inauguration', icon: <FaTrophy />, venue: 'Platinum Hall' },
                { startTime: '10:45', endTime: '11:30', title: 'Keynote Speaker', icon: <FaUserTie />, venue: 'Platinum Hall' },
                { startTime: '11:30', endTime: '13:00', title: 'Track Session', icon: <FaClipboardList />, venue: 'Platinum Hall' },
                { startTime: '13:00', endTime: '14:00', title: 'Lunch', icon: <FaUtensils />, venue: 'Himalayan Hostel' },
                { startTime: '14:00', endTime: '16:00', title: 'Parallel Session', icon: <FaProjectDiagram />, venue: 'Platinum Hall' },
            ],
        },
        day2: {
            date: '2026-03-27',
            events: [
                // MODIFIED: Icons changed to match events
                { startTime: '10:00', endTime: '10:45', title: 'Inauguration', icon: <FaTrophy />, venue: 'Platinum Hall' },
                { startTime: '10:45', endTime: '11:30', title: 'Keynote Speaker', icon: <FaUserTie />, venue: 'Platinum Hall' },
                { startTime: '11:30', endTime: '13:00', title: 'Track Session', icon: <FaClipboardList />, venue: 'Platinum Hall' },
                { startTime: '13:00', endTime: '14:00', title: 'Lunch', icon: <FaUtensils />, venue: 'Himalayan Hostel' },
                { startTime: '14:00', endTime: '16:00', title: 'Parallel Session', icon: <FaProjectDiagram />, venue: 'Platinum Hall' },
            ],
        },
    };

    const getEventStatus = (eventDate, startTime, endTime) => {
        const startDateTime = new Date(`${eventDate}T${startTime}:00`);
        const endDateTime = new Date(`${eventDate}T${endTime}:00`);
        if (currentTime > endDateTime) return 'completed';
        if (currentTime >= startDateTime && currentTime <= endDateTime) return 'in-progress';
        return 'upcoming';
    };

    const handleTabClick = (tab) => {
        if (tab === activeTab) return;
        setIsFading(true);
        setTimeout(() => {
            setActiveTab(tab);
            setIsFading(false);
        }, 300);
    };

    const activeDay = scheduleData[activeTab];
    const countdownTarget = `${scheduleData.day1.date}T${scheduleData.day1.events[0].startTime}:00`;

    return (
        <main className="agenda-page">
            <section className="agenda-hero">
                <div className="agenda-container">
                    <h1 className="agenda-hero-title">Conference Agenda</h1>
                    <p className="agenda-hero-subtitle">Explore our detailed schedule and plan your days. The future awaits!</p>
                    <Countdown targetDate={countdownTarget} />
                </div>
            </section>

            <div className="agenda-container agenda-schedule-container">
                <div className="agenda-tabs">
                    <button className={`agenda-tab-btn ${activeTab === 'day1' ? 'active' : ''}`} onClick={() => handleTabClick('day1')}>Day 1: March 26, 2026</button>
                    <button className={`agenda-tab-btn ${activeTab === 'day2' ? 'active' : ''}`} onClick={() => handleTabClick('day2')}>Day 2: March 27, 2026</button>
                </div>

                <div className={`agenda-grid-content ${isFading ? 'fading' : ''}`}>
                    <div className="agenda-grid" key={activeTab}>
                        {activeDay.events.map((event, index) => {
                            const status = getEventStatus(activeDay.date, event.startTime, event.endTime);
                            return (
                                <div
                                    className={`agenda-grid-item ${status}`}
                                    key={index}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="agenda-time-slot">
                                        <div className="agenda-time">{event.startTime}</div>
                                        <div className="agenda-time-connector"></div>
                                    </div>
                                    <div className="agenda-card">
                                        <div className="agenda-card-header">
                                            <div className="agenda-icon">{event.icon}</div>
                                            <div className="agenda-title-group">
                                                <h4 className="agenda-event-title">{event.title}</h4>
                                                <p className="agenda-event-duration"><FaClock /> {event.startTime} - {event.endTime}</p>
                                            </div>
                                            {status === 'in-progress' && <span className="agenda-live-badge"><FaBroadcastTower /> LIVE</span>}
                                            {status === 'completed' && <span className="agenda-completed-badge"><FaRegCheckCircle /> Done</span>}
                                        </div>
                                        {event.venue && <p className="agenda-event-venue"><FaMapMarkerAlt /> {event.venue}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Agenda;