import React, { useState } from 'react';
import './Map.css'; // Make sure to import the CSS

const locations = {
  venue: {
    name: "K.S.R College of Engineering",
    address: "K.S.R Kalvi Nagar, Tiruchengode, Tamil Nadu 637215, India",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.673750413204!2d77.82913321114565!3d11.358523288781234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964017038dfe3%3A0xd5a68d71e9c1aec7!2sK%20S%20R%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1755101071051!5m2!1sen!2sin"
  },
  transport: [
    {
  name: "Tiruchirappalli International Airport (TRZ)",
  description: "Approx. 150 km away",
  icon: "✈",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.4547239019577!2d78.70781407471092!3d10.764504759259514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa7b9a95c72733%3A0xb9c6d94b2f307a2b!2sTiruchirappalli%20International%20Airport!5e0!3m2!1sen!2sin!4v1755100812345!5m2!1sen!2sin"
  },
    {
  name: "Coimbatore International Airport (CJB)",
  description: "Approx. 157 km from Salem", 
  icon: "✈",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3850.687492341207!2d77.041667!3d11.026667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8593190e7f22d%3A0x817e2f86bb2324fa!2sCoimbatore%20International%20Airport!5e0!3m2!1sen!2sin!4v1755100718646!5m2!1sen!2sin"
},

    { name: "Salem Airport (SXV)", description: "Approx. 50 km away", icon: "✈", mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.7500342797102!2d78.0592873111514!3d11.782642588385752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf8f87b1279e3%3A0xbe8dbb2438f66f95!2sSalem%20Airport!5e0!3m2!1sen!2sin!4v1755100718646!5m2!1sen!2sin" },
    { name: "Tiruchengode Bus Stand", description: "Approx. 8 km away", icon: "🚌", mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.351032081166!2d77.89279476114602!3d11.382030388759267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba961d2f41f9cd3%3A0x37576bd54e30bae6!2sThiruchengodu%20New%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1755100829207!5m2!1sen!2sin" },
    { name: "Erode Bus Stand", description: "Approx. 20 km away", icon: "🚌", mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.83289731373!2d77.71708601114557!3d11.346913188792085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96fcae26b8dc7%3A0xeb1047fe62374b3d!2sErode%20bus%20stand!5e0!3m2!1sen!2sin!4v1755100920084!5m2!1sen!2sin" },
    { name: "Erode Junction (ED)", description: "Approx. 20 km away", icon: "🚆", mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.0835629973135!2d77.72321881114524!3d11.328602788809217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f132da794ef%3A0x34213a37eae28736!2sErode%20Junction!5e0!3m2!1sen!2sin!4v1755101010034!5m2!1sen!2sin" }
  ],
  visit: [
  {
    name: "Kolli Hills",
    description: "Beautiful viewpoints, waterfalls, trekking spots, and the famous Arappaleeswarar Temple. Located around 40 km from Tiruchengode (~1.5 to 2 hrs).",
    icon: "⛰️",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.812280!2d78.321!3d11.267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa8b3b0b000001%3A0x8f2d3f7a3b0a4d3a!2sKolli%20Hills!5e0!3m2!1sen!2sin!4v1678887210000!5m2!1sen!2sin"
  },
  {
    name: "Yercaud",
    description: "Scenic hill station known for coffee plantations, Yercaud Lake, and nature trails. About 95 km from Tiruchengode (~2.5 to 3 hrs).",
    icon: "🌿",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.000000!2d78.204!3d11.775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf94b0b000001%3A0x8f2d3f7a3b0a4d3a!2sYercaud!5e0!3m2!1sen!2sin!4v1678887220000!5m2!1sen!2sin"
  },
  {
    name: "Valparai",
    description: "Hill station famous for tea estates, wildlife sanctuaries, and waterfalls. Around 110 km from Tiruchengode (~3 to 3.5 hrs).",
    icon: "🌄",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.345678!2d76.951!3d10.326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf00000000001%3A0x8f2d3f7a3b0a4d3a!2sValparai!5e0!3m2!1sen!2sin!4v1678887230000!5m2!1sen!2sin"
  },
  {
    name: "Kodaikanal",
    description: "Known as the 'Princess of Hill Stations', featuring lakes, waterfalls, and trekking trails. Approximately 120 km from Tiruchengode (~3.5 to 4 hrs).",
    icon: "🏞️",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.999999!2d77.489!3d10.238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf123456789ab%3A0x8f2d3f7a3b0a4d3a!2sKodaikanal!5e0!3m2!1sen!2sin!4v1678887240000!5m2!1sen!2sin"
  },
  {
    name: "Coonoor",
    description: "Peaceful hill station with tea gardens, Sim’s Park, and Dolphin’s Nose viewpoint. Around 140 km from Tiruchengode (~4 hrs).",
    icon: "🍃",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.345678!2d76.822!3d11.353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba99e0000000001%3A0x8f2d3f7a3b0a4d3a!2sCoonoor!5e0!3m2!1sen!2sin!4v1678887250000!5m2!1sen!2sin"
  },
  {
    name: "Ooty (Udhagamandalam)",
    description: "Famous for its botanical gardens, Ooty Lake, and the Nilgiri Mountain Railway. About 160 km from Tiruchengode (~4.5 to 5 hrs).",
    icon: "🚞",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.567890!2d76.695!3d11.406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba98a0000000001%3A0x8f2d3f7a3b0a4d3a!2sOoty!5e0!3m2!1sen!2sin!4v1678887260000!5m2!1sen!2sin"
  }
]
};

const Map = () => {
  const [activeTab, setActiveTab] = useState('venue');
  const [mapSrc, setMapSrc] = useState(locations.venue.mapSrc);
  const [activeLocationName, setActiveLocationName] = useState(locations.venue.name);
  const [activeLocationIndex, setActiveLocationIndex] = useState(null);

  const handleLocationClick = (src, name, index) => {
    setMapSrc(src);
    setActiveLocationName(name);
    setActiveLocationIndex(index);
  };

  const handleTabClick = (tab, initialSrc, initialName) => {
      setActiveTab(tab);
      setMapSrc(initialSrc);
      setActiveLocationName(initialName);
      setActiveLocationIndex(0);
  }

  return (
    <section className="venue-section">
      <div className="container">
        <div className="venue-grid">
          <div className="venue-info">
            <p className="kicker">// REACH US</p>
            <div className="section-header">
              <h2>Get Directions to the Event Hall</h2>
            </div>
            <div className="venue-tabs">
              <button
                className={`venue-tab ${activeTab === 'venue' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('venue');
                  handleLocationClick(locations.venue.mapSrc, locations.venue.name, null);
                }}
              >
                Venue
              </button>
              <button
                className={`venue-tab ${activeTab === 'transport' ? 'active' : ''}`}
                onClick={() => handleTabClick('transport', locations.transport[0].mapSrc, locations.transport[0].name)}
              >
                How to get there
              </button>
              <button
                className={`venue-tab ${activeTab === 'visit' ? 'active' : ''}`}
                onClick={() => handleTabClick('visit', locations.visit[0].mapSrc, locations.visit[0].name)}
              >
                Places to Visit
              </button>
            </div>
            <div className="venue-tab-content">
              {activeTab === 'venue' && (
                <div className="tab-pane">
                  <h3>{locations.venue.name}</h3>
                  <p>{locations.venue.address}</p>
                </div>
              )}
              {activeTab === 'transport' && (
                <div className="tab-pane">
                  {locations.transport.map((item, index) => (
                    <div 
                        key={index} 
                        className={`location-item ${activeLocationIndex === index ? 'active' : ''}`} 
                        onClick={() => handleLocationClick(item.mapSrc, item.name, index)}
                    >
                      <h4><span className="icon">{item.icon}</span> {item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'visit' && (
                <div className="tab-pane">
                  {locations.visit.map((item, index) => (
                    <div 
                        key={index} 
                        className={`location-item ${activeLocationIndex === index ? 'active' : ''}`} 
                        onClick={() => handleLocationClick(item.mapSrc, item.name, index)}
                    >
                      <h4><span className="icon">{item.icon}</span> {item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="venue-map">
            <iframe
              key={mapSrc}
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="map-pin" key={activeLocationName}>
                {activeLocationName}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
