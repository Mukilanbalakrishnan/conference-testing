import React from 'react';
import './Patrons.css';

// Data for all patrons
const patronsData = [
    {
        id: 1,
        name: 'Dr. M. Venkatesan',
        role: 'Dean',
        organization: 'K.S.R College of Engineering',
        Area: "India",
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755926462/n0qgaug4gqeqerhworus.webp',
        blobColor: '#0d47a1',
        type: 'Patron',
    },
    {
        id: 2,
        name: 'Dr. P. Meenakshi Devi',
        role: 'Principal',
        organization: 'K.S.R College of Engineering',
        Area: "India",
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755926530/s89gz5dlc9evl67gw28l.webp',
        blobColor: '#F57C00',
        type: 'Patron',
    },
    {
        id: 3,
        name: 'Dr. Asokan Vasudevan',
        role: 'Director, ICCCBS',
        organization: 'INTI International University',
        Area: "Malaysia",
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755926638/kn5ymfczpw5kefugb19e.jpg',
        blobColor: '#0d47a1',
        type: 'Co-Patron',
    },
    {
        id: 4,
        name: 'Dr. Veena',
        role: 'Director – IQAC',
        organization: 'K.S.R College of Engineering',
        Area: "India",
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755927599/d04cng0plsplt36g1dzl.webp',
        blobColor: '#F57C00',
        type: 'Co-Patron',
    },
];

// Reusable card component for displaying each person
const PatronCard = ({ name, role, imageUrl, blobColor, organization, Area }) => (
    <div className="patron-card">
        <div className="patron-card__image-wrapper">
            <div className="patron-card__blob" style={{ backgroundColor: blobColor }}></div>
            <img
                src={imageUrl}
                alt={`Portrait of ${name}`}
                className="patron-card__image"
                loading="lazy"
            />
        </div>
        <div className="patron-card__details">
            <h3 className="patron-card__name">{name}</h3>
            <p className="patron-card__role">{role}</p>
            <p className="patron-card__orgenization">{organization}</p>
            {Area && <p className="patrons-card__tagline patrons-card__tagline--country">{Area}</p>}
            <p></p>
        </div>
    </div>
);

// The main Patrons component
const Patrons = () => {
    // Filter data into separate arrays
    const patrons = patronsData.filter((p) => p.type === 'Patron');
    const coPatrons = patronsData.filter((p) => p.type === 'Co-Patron');

    return (
        <section className="patron-section">
            <div className="container">
                <div className="patron-section__header">
                    <h2 className="patron-section__title">Our Esteemed Patrons</h2>
                    <p className="patron-section__subtitle">
                        Guided by visionary leaders who inspire our mission.
                    </p>
                </div>
                <div className="patron-groups-wrapper">
                    {/* Group 1: Patrons */}
                    <div className="patron-group">
                        <h3 className="patron-group__title">Patrons</h3>
                        <div className="patron-group__cards">
                            {patrons.map((person) => (
                                <PatronCard key={person.id} {...person} />
                            ))}
                        </div>
                    </div>

                    {/* Group 2: Co-Patron */}
                    <div className="patron-group">
                        <h3 className="patron-group__title">Co-Patron</h3>
                        <div className="patron-group__cards">
                            {coPatrons.map((person) => (
                                <PatronCard key={person.id} {...person} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Patrons;

