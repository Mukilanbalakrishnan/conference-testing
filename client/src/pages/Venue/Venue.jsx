import React, { useState, useEffect, useRef } from 'react';
import './Venue.css';
import { FaHotel, FaInfoCircle } from 'react-icons/fa';

const eventData = [
    {
        id: 'evt1',
        type: 'event',
        name: 'Inauguration Ceremony',
        venue: 'Platinum Hall',
        time: '09:30 AM',
        description: 'The official opening of the Joint-Conference, featuring a welcome address by the Chairman.',
        image: 'https://placehold.co/600x400/0D47A1/FFFFFF?text=Platinum+Hall',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d977.9196700916191!2d77.83117572843234!3d11.358163814138777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964016fddc3ad%3A0x672cf11184055521!2sK%20S%20R%20Library%20Block!5e0!3m2!1sen!2sin!4v1759117821591!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        id: 'evt2',
        type: 'event',
        name: 'Keynote by Dr. Malathy Batumalay',
        venue: 'Platinum Hall',
        time: '11:00 AM',
        description: 'A thought-provoking keynote address by  Dr. Malathy Batumalay.',
        image: 'https://placehold.co/600x400/F57C00/FFFFFF?text=Platinum+Hall',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d977.9196700916191!2d77.83117572843234!3d11.358163814138777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964016fddc3ad%3A0x672cf11184055521!2sK%20S%20R%20Library%20Block!5e0!3m2!1sen!2sin!4v1759117821591!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
];

const hostelData = [
    {
        id: 'hst1',
        type: 'hostel',
        name: "Marina Hostel(Men)",
        description: "A well-furnished hostel for men with modern amenities, including Wi-Fi and 24/7 security.",
        breakfast: '7:30 - 8:30 AM',
        lunch: '12:30 - 1:30 PM',
        dinner: '7:30 - 8:30 PM',
        image: 'https://placehold.co/600x400/1976D2/FFFFFF?text=Men%27s+Hostel',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1331.1081425384627!2d77.82446350859206!3d11.35574923241508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9640355489f55%3A0x19eac819d527120a!2sKSR%20Institute%20Rd%2C%20Tamil%20Nadu%20637215!5e0!3m2!1sen!2sin!4v1759118647132!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        id: 'hst2',
        type: 'hostel',
        name: "Tiruchy Hostel(Women)",
        description: "A secure and comfortable hostel for women, offering a pleasant living environment.",
        breakfast: '7:30 - 8:30 AM',
        lunch: '12:30 - 1:30 PM',
        dinner: '7:30 - 8:30 PM',
        image: 'https://placehold.co/600x400/D32F2F/FFFFFF?text=Women%27s+Hostel',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861.1779644246215!2d77.82889324580088!3d11.359029675596998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964022b418327%3A0x5bc1d1b180fa4c8e!2s9R5H%2BWV9%20KSR%20New%20ladies%20hostel%202%2C%20Tamil%20Nadu%20637215!5e0!3m2!1sen!2sin!4v1759118745710!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
];

// Reusable Modal Component
const DetailModal = ({ item, onClose }) => {
    if (!item) return null;
    const isEvent = item.type === 'event';
    return (
        <div className="venue-modal-overlay" onClick={onClose}>
            <div className="venue-modal-content" onClick={e => e.stopPropagation()}>
                <button className="venue-modal-close-btn" onClick={onClose}>×</button>
                <img src={item.image} alt={item.name} className="venue-modal-image" />
                <div className="venue-modal-body">
                    <h3>{item.name}</h3>
                    {isEvent ? (
                        <p className="venue-modal-meta"><strong>Venue:</strong> {item.venue} | <strong>Time:</strong> {item.time}</p>
                    ) : (
                        <p className="venue-modal-meta"><strong>Dining:</strong> Breakfast, Lunch & Dinner Provided</p>
                    )}
                    <p>{item.description}</p>
                    <div className="venue-modal-map" dangerouslySetInnerHTML={{ __html: item.map }}></div>
                </div>
            </div>
        </div>
    );
};

// Reusable Section component with scroll animation logic
const AnimatedSection = ({ id, title, children }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section id={id} ref={sectionRef} className={`content-section ${isVisible ? 'is-visible' : ''}`}>
            <h2>{title}</h2>
            {children}
        </section>
    );
};


const Venue = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <>
            <main className="venue-page">
                <AnimatedSection id="venue" title="Event Schedule">
                    <div className="content-box">
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Venue</th>
                                    <th>Time</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventData.map((event) => (
                                    <tr key={event.id}>
                                        <td data-label="Event Name">{event.name}</td>
                                        <td data-label="Venue">{event.venue}</td>
                                        <td data-label="Time">{event.time}</td>
                                        <td data-label="Action">
                                            <button className="btn btn-details" onClick={() => setSelectedItem(event)}>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </AnimatedSection>

                <AnimatedSection id="hostel-dining" title="Hostel & Dining">
                       <div className="content-box">
                            <table className="info-table">
                                <thead>
                                    <tr>
                                        <th>Hostel Name</th>
                                        <th>Breakfast</th>
                                        <th>Lunch</th>
                                        <th>Dinner</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostelData.map((hostel) => (
                                        <tr key={hostel.id}>
                                            <td data-label="Hostel Name">{hostel.name}</td>
                                            <td data-label="Breakfast">{hostel.breakfast}</td>
                                            <td data-label="Lunch">{hostel.lunch}</td>
                                            <td data-label="Dinner">{hostel.dinner}</td>
                                            <td data-label="Action">
                                                <button className="btn btn-details" onClick={() => setSelectedItem(hostel)}>
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </AnimatedSection>
                
                <AnimatedSection id="accommodation-details" title="Accommodation Details">
                    <div className="content-box">
                        <div className="accommodation-info">
                            <p>
                                For participants attending the conference, here are some recommended hotels in Erode and Tiruchengode.
                            </p>
                            <div className="hotel-links">
                                <a href="https://www.makemytrip.com/hotels/erode-hotels.html" target="_blank" rel="noopener noreferrer" className="btn btn-link">
                                    <FaHotel /> Hotels in Erode
                                </a>
                                <a href="https://www.makemytrip.com/hotels/tiruchengode-hotels.html" target="_blank" rel="noopener noreferrer" className="btn btn-link">
                                    <FaHotel /> Hotels in Tiruchengode
                                </a>
                            </div>
                            <div className="accommodation-note">
                                <FaInfoCircle className="note-icon" />
                                <div>
                                    <strong>Note:</strong> On-campus hostel accommodation is available upon request. For more information, please check the main conference website.
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </main>
            <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        </>
    );
};

export default Venue;