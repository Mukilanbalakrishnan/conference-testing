import React, { useState, useEffect, useRef } from 'react';

// This component includes its own styles for a self-contained setup.
const componentStyles = `
/* --- Global Styles & Variables (from app.css) --- */

/* --- Main Layout --- */
.deadlines-container {
    font-family: 'Poppins', sans-serif;
    background-color: var(--white);
    width: 100%;
    margin: 3rem auto;
    border-radius: 1.5rem;
    padding: clamp(2rem, 5vw, 4rem);
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
}

.deadlines-header {
    text-align: center;
    margin-bottom: 4rem;
}

.header-title {
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 700;
    color: var(--brand-blue-dark);
    line-height: 1;
    margin-bottom: 0.75rem;
}

.header-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto;
}

/* --- Deadlines Timeline --- */
.deadlines-timeline-wrapper {
    overflow-x: auto;
    padding: 3rem 0;
    margin: 0 -2rem;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.deadlines-timeline-wrapper::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}


.deadlines-list {
    display: flex;
    position: relative;
    min-width: 1400px;
    padding: 3rem 4%;
}

/* The central timeline bar (background) */
.deadlines-list::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 4%;
    transform: translateY(-50%);
    width: 92%;
    height: 4px; /* Slightly thicker */
    background-color: var(--surface-dark);
    border-radius: 2px;
}

/* The highlight bar that animates on scroll */
.timeline-highlight {
    position: absolute;
    top: 50%;
    left: 4%;
    transform: translateY(-50%);
    height: 4px;
    width: 0; /* Starts at 0, width is set by JS */
    background:  var(--text-primary);
    border-radius: 2px;
    z-index: 0;
    transition: width 0.2s linear;
}


.deadline-item {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.deadline-item.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* The dot on the timeline */
.deadline-item::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background-color: var(--surface-dark);
    border-radius: 50%;
    z-index: 2;
    transition: background-color 0.4s ease, transform 0.4s ease;
}

.deadline-item.is-visible::before {
    background-color: var(--dot-color);
    transform: translate(-50%, -50%) scale(1.1);
}

.deadline-content {
    width: 220px;
    padding: 1.5rem;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    text-align: left;
    position: relative;
    border-top: 4px solid var(--surface-dark);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-top-color 0.3s ease;
    z-index: 1;
}
.deadline-item.is-visible .deadline-content {
    border-top-color: var(--dot-color);
}
.deadline-content:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.1);
}

.deadline-content::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 3rem;
    background-color: var(--surface-dark);
    z-index: -1;
}

/* Position items above or below the line */
.deadline-item:nth-child(even) .deadline-content {
    margin-top: 18rem; /* Pushes card DOWN */
}
.deadline-item:nth-child(even) .deadline-content::after {
    top: -3rem;
}

.deadline-item:nth-child(odd) .deadline-content {
    margin-top: -1rem; /* Pushes card UP */
}
.deadline-item:nth-child(odd) .deadline-content::after {
    bottom: -3rem;
}


.date-display {
    font-weight: 700;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
}
.date-day {
    font-size: 1.5rem;
    line-height: 1;
}
.date-month {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
}

.deadline-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
}

.deadline-description {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
}

/* Responsive for Mobile */
@media (max-width: 1200px) {
    .deadlines-timeline-wrapper {
        overflow-x: hidden;
        margin: 0;
        padding: 0;
    }
    .deadlines-list {
        flex-direction: column;
        min-width: 0;
        padding: 0;
    }
    .deadlines-list::before {
        left: 20px;
        top: 0;
        height: 100%;
        width: 4px;
        transform: none;
    }
    .timeline-highlight {
        left: 18px;
        top: 0;
        width: 4px; /* Fixed width for vertical */
        height: 0; /* Height is set by JS */
        transform: none;
        transition: height 0.2s linear;
    }
    .deadline-item {
        flex-direction: row;
        align-items: flex-start;
        padding-left: 50px;
    }
    .deadline-item:not(:last-child) {
        margin-bottom: 2rem;
    }
    .deadline-item::before {
        left: 20px;
        top: 1.5rem;
        transform: translate(-50%, 0);
    }
    .deadline-item:nth-child(odd) .deadline-content,
    .deadline-item:nth-child(even) .deadline-content {
        margin: 0;
        width: 100%;
        text-align: left;
    }
    .deadline-content::after {
        display: none;
    }
}
`;

// Data with your deadlines
const deadlineData = [
  { month: 'NOV', day: '30', title: 'Full Paper Submission', description: 'Deadline for 2025', color: 'var(--brand-orange)' },
  { month: 'DEC', day: '15', title: 'Late Submission', description: 'Extended Deadline for 2025', color: 'var(--brand-blue-primary)' },
  { month: 'JAN', day: '31', title: 'Acceptance Notification', description: 'For 2026 Submissions', color: 'var(--brand-orange)' },
  { month: 'FEB', day: '20', title: 'Author Registration', description: 'Registration Deadline for 2026', color: 'var(--brand-blue-primary)' },
  { month: 'FEB', day: '27', title: 'Final Track Registration', description: 'Final Deadline for 2026', color: 'var(--brand-orange)' },
  { month: 'MAR', day: '26-27', title: 'Conference Days', description: "S3-ECBE' 2026", color: 'var(--brand-blue-primary)' },
];

const UpcomingDeadlines = () => {
    const sectionRef = useRef(null);
    const timelineWrapperRef = useRef(null);
    const highlightRef = useRef(null);

    // Observer for individual item animations
    useEffect(() => {
        const items = sectionRef.current.querySelectorAll('.deadline-item');
        if (!items.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.5 }
        );

        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });

        return () => items.forEach(item => observer.unobserve(item));
    }, []);

    // Effect for scroll-based highlight bar
    useEffect(() => {
        const wrapper = timelineWrapperRef.current;
        const highlight = highlightRef.current;
        if (!wrapper || !highlight) return;

        const handleScroll = () => {
            const isMobile = window.innerWidth <= 1200;
            if (isMobile) {
                // Vertical scroll logic
                const containerRect = sectionRef.current.getBoundingClientRect();
                const scrollY = window.scrollY;
                // Start highlighting when the top of the section is in view
                const startPoint = sectionRef.current.offsetTop - window.innerHeight / 2;
                const endPoint = sectionRef.current.offsetTop + sectionRef.current.offsetHeight - window.innerHeight / 2;
                
                let progress = (scrollY - startPoint) / (endPoint - startPoint);
                progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
                
                highlight.style.height = `${progress * 100}%`;

            } else {
                // Horizontal scroll logic
                const scrollPercentage = wrapper.scrollLeft / (wrapper.scrollWidth - wrapper.clientWidth);
                highlight.style.width = `${scrollPercentage * 92}%`; // 92% to match bar width
            }
        };
        
        const scrollTarget = window.innerWidth <= 1200 ? window : wrapper;
        scrollTarget.addEventListener('scroll', handleScroll);
        
        // Initial call
        handleScroll();

        return () => scrollTarget.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <React.Fragment>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap');
                {componentStyles}
            </style>
            <div ref={sectionRef} className="deadlines-container">
                 <header className="deadlines-header">
                    <h2 className="header-title">Important Dates</h2>
                    <p className="header-subtitle">Stay updated with our conference schedule.</p>
                </header>
                <div ref={timelineWrapperRef} className="deadlines-timeline-wrapper">
                    <div className="deadlines-list">
                        <div ref={highlightRef} className="timeline-highlight"></div>
                        {deadlineData.map((item, index) => (
                            <div 
                                key={index} 
                                className="deadline-item" 
                                style={{'--dot-color': item.color}}
                            >
                                <div className="deadline-content">
                                    <div className="date-display" style={{ color: item.color }}>
                                        <span className="date-day">{item.day}</span>
                                        <span className="date-month">{item.month}</span>
                                    </div>
                                    <h3 className="deadline-title">{item.title}</h3>
                                    <p className="deadline-description">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UpcomingDeadlines;

