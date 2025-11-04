// import React, { useEffect, useRef } from 'react';
// import './Speaker.css';
// import { FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';

// // --- Main Component ---
// const EventSpeaker = () => {
//     const eventSpeakers = [
//         {
//             id: 'spk1',
//             name: 'Dr. Malathy Batumalay',
//             title: 'Associate Professor',
//             title2: 'Faculty of Data Science and Information Technology',
//             image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754148/nvbpdwncdrxpekuksahy.webp',
//             bio: 'INTI International University, Malaysia',
//             social: { linkedin: '#', twitter: '#', website: '#' }
//         },
//         {
//             id: 'spk2',
//             name: 'Dr. Sandipan Mallik',
//             title: 'Professor',
//             title2: 'Department of Electronics and Communication Engineering',
//             image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755757219/sgphhfiniml8lavztk6w.jpg',
//             bio: 'NIST University,Berhampur, Odisha, India.',
//             social: { linkedin: '#', twitter: '#', website: '#' }
//         },
//         {
//             id: 'spk4',
//             name: 'Dr N Sivakumaran',
//             title: 'Professor',
//             title2: 'Department of Bio Medical Engineering',
//             image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757477854/ooo46qnl2b6qg5zbvdn7.jpg',
//             bio: 'ICE, National Institute of Technology, Tiruchy.',
//             social: { linkedin: '#', twitter: '#', website: '#' }
//         },
//         {
//             id: 'spk3',
//             name: 'Dr. Sathish Kumar Selvaperumal',
//             title: 'Associate Professor',
//             title2: 'Department of Electrical and Electronic Engineering',
//             image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757413874/wwr3oyysqlzuxeomkobj.webp',
//             bio: 'Asia Pacific University of Technology and Innovation (APU), Malaysia.',
//             social: { linkedin: '#', twitter: '#', website: '#' }
//         }
//     ];

//     const sectionRef = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('is-visible');
//                         observer.unobserve(entry.target);
//                     }
//                 });
//             },
//             {
//                 threshold: 0.1,
//             }
//         );

//         const elements = sectionRef.current.querySelectorAll('.event-speaker-profile');
//         elements.forEach((el) => observer.observe(el));

//         return () => {
//             elements.forEach((el) => observer.unobserve(el));
//         };
//     }, []);


//     return (
//         <main className="speaker-page-main">
//             <header className="event-page-header">
//                 <div className="event-container">
//                     <h1>KeyNote Speakers</h1>
//                     <p>Listen to the insights from our distinguished speakers.</p>
//                 </div>
//             </header>

//             <section ref={sectionRef} className="event-speakers-section">
//                 <div className="event-container">
//                     <div className="event-speakers-grid">
//                         {eventSpeakers.map((spk, index) => (
//                             <div
//                                 className="event-speaker-profile"
//                                 key={spk.id}
//                                 style={{ transitionDelay: `${index * 0.1}s` }}
//                             >
//                                 <div className="event-speaker-image-wrapper">
//                                     <svg width="100%" height="100%" viewBox="0 0 160 160" className="event-speaker-svg-border">
//                                         <defs>
//                                             <clipPath id={`speaker-clip-${spk.id}`}>
//                                                 <circle cx="80" cy="80" r="70" />
//                                             </clipPath>
//                                         </defs>
//                                         <image
//                                             clipPath={`url(#speaker-clip-${spk.id})`}
//                                             href={spk.image}
//                                             x="10" y="10" height="140" width="140"
//                                             preserveAspectRatio="xMidYMid slice"
//                                         />
//                                         <path className="event-border-path-1" d="M 5,80 a 75,75 0 0 1 150,0" />
//                                         <path className="event-border-path-2" d="M 155,80 a 75,75 0 0 1 -150,0" />
//                                     </svg>
//                                 </div>
//                                 <div className="event-speaker-info">
//                                     <h3 className="event-name">{spk.name}</h3>
//                                     <p className="event-title">{spk.title}</p>
//                                     <p className="event-title2">{spk.title2}</p>
//                                     <p className="event-bio">{spk.bio}</p>
//                                     <div className="event-speaker-socials">
//                                         <a href={spk.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
//                                         <a href={spk.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
//                                         <a href={spk.social.website} target="_blank" rel="noopener noreferrer" aria-label="Website"><FaGlobe /></a>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// };

// export default EventSpeaker;





import React, { useEffect, useRef } from 'react';
import './Speaker.css';
import { FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';

// --- Main Component ---
const EventSpeaker = () => {
    const eventSpeakers = [
        {
            id: 'spk1',
            name: 'Dr. Malathy Batumalay',
            title: 'Associate Professor',
            title2: 'Faculty of Data Science and Information Technology',
            image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754148/nvbpdwncdrxpekuksahy.webp',
            bio: 'INTI International University, Malaysia',
            social: { linkedin: '#', twitter: '#', website: '#' }
        },
        {
            id: 'spk2',
            name: 'Dr. Sandipan Mallik',
            title: 'Professor',
            title2: 'Department of Electronics and Communication Engineering',
            image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755757219/sgphhfiniml8lavztk6w.jpg',
            bio: 'NIST University,Berhampur, Odisha, India.',
            social: { linkedin: '#', twitter: '#', website: '#' }
        },
        {
            id: 'spk4',
            name: 'Dr. N. Sivakumaran',
            title: 'Professor',
            title2: 'Department of Bio Medical Engineering',
            image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757477854/ooo46qnl2b6qg5zbvdn7.jpg',
            bio: 'ICE, National Institute of Technology, Tiruchy.',
            social: { linkedin: '#', twitter: '#', website: '#' }
        },
        {
            id: 'spk3',
            name: 'Dr. Sathish Kumar Selvaperumal',
            title: 'Associate Professor',
            title2: 'Department of Electrical and Electronic Engineering',
            image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757413874/wwr3oyysqlzuxeomkobj.webp',
            bio: 'Asia Pacific University of Technology and Innovation (APU), Malaysia.',
            social: { linkedin: '#', twitter: '#', website: '#' }
        }
    ];

    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        const elements = sectionRef.current.querySelectorAll('.event-speaker-profile');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);


    return (
        <main className="speaker-page-main">
            <header className="event-page-header">
                <div className="event-container">
                    <h1>KeyNote Speakers</h1>
                    <p>Listen to the insights from our distinguished speakers.</p>
                </div>
            </header>

            <section ref={sectionRef} className="event-speakers-section">
                <div className="event-container">
                    <div className="event-speakers-grid">
                        {eventSpeakers.map((spk, index) => (
                            <div
                                className="event-speaker-profile"
                                key={spk.id}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="event-speaker-image-wrapper">
                                    <svg width="100%" height="100%" viewBox="0 0 160 160" className="event-speaker-svg-border">
                                        <defs>
                                            <clipPath id={`speaker-clip-${spk.id}`}>
                                                <circle cx="80" cy="80" r="70" />
                                            </clipPath>
                                        </defs>
                                        <image
                                            clipPath={`url(#speaker-clip-${spk.id})`}
                                            href={spk.image}
                                            x="10" y="10" height="140" width="140"
                                            preserveAspectRatio="xMidYMid slice"
                                        />
                                        <path className="event-border-path-1" d="M 5,80 a 75,75 0 0 1 150,0" />
                                        <path className="event-border-path-2" d="M 155,80 a 75,75 0 0 1 -150,0" />
                                    </svg>
                                </div>
                                <div className="event-speaker-info">
                                    <h3 className="event-name">{spk.name}</h3>
                                    <p className="event-title">{spk.title}</p>
                                    <p className="event-title2">{spk.title2}</p>
                                    <p className="event-bio">{spk.bio}</p>
                                    <div className="event-speaker-socials">
                                        <a href={spk.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                                        <a href={spk.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                                        <a href={spk.social.website} target="_blank" rel="noopener noreferrer" aria-label="Website"><FaGlobe /></a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EventSpeaker;