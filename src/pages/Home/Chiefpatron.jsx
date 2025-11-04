import React from 'react';
import './Chiefpatron.css';

const chiefPatronsData = [
  {
        id: 1,
        name: 'Mr. R. Srinivasan, B.B.M.',
        role: 'CHAIRMAN',
        tagline: 'K.S.R Educational Institutions',
        tagline1:'India',
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754288/zqoqdnu8hskpabyhylqk.webp',
    },
    {
        id: 2,
        name: 'Mr. S. Sachin',
        role: 'VICE CHAIRMAN',
        tagline: 'K.S.R Educational Institutions',
        tagline1:'India',
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755755590/u5rxh0jpmvigqmiennoi.webp',
    },
    {
        id: 3,
        name: 'Dr. Joseph Lee Yu Khang, Ph.D.',
        role: 'VICE CHANCELLOR',
        tagline: 'INTI International University',
        tagline1: 'Malaysia',
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1756132702/f5kj5ciravj77we2tz4b.jpg',
    },
];

const ChiefPatronCard = ({ name, role, tagline, country, imageUrl, tiltClass }) => (
    <div className="chief-patrons-card__wrapper">
        <div className={`chief-patrons-card ${tiltClass}`}>
            <div className="chief-patrons-card__image-container">
                <img src={imageUrl} alt={`Portrait of ${name}`} className="chief-patrons-card__image" loading="lazy" />
            </div>
        </div>
        <div className="chief-patrons-card__info">
            <h3 className="chief-patrons-card__name">{name}</h3>
            <p className="chief-patrons-card__role">{role}</p>
            <p className="chief-patrons-card__tagline">{tagline}</p>
            <p className="chief-patrons-card__tagline chief-patrons-card__tagline--country">{country}</p>
        </div>
    </div>
);


const ChiefPatron = () => {
  return (
    <section className="chief-patrons-section">
      <div className="chief-patrons-container">
        <header className="chief-patrons-header">
          <h2 className="chief-patrons-title">Chief Patrons</h2>
           <p className="chief-patrons-subtitle">Guided by visionary leaders who inspire our mission.</p>
        </header>
        <div className="chief-patrons-grid">
          {chiefPatronsData.map((patron, index) => (
            <ChiefPatronCard 
                key={patron.id} 
                {...patron} 
                tiltClass={`chief-patrons-card--tilt-${(index % 3) + 1}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChiefPatron;

