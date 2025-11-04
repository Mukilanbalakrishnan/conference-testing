import React from 'react';
import './Organizers.css';

const Organizers = () => {
  return (
    <section className="organizers-section">
      <div className="container">
        <div className="section-header">
          <p className="kicker">// PEOPLE & INFORMATION</p>
          <h2>Key Roles & Details</h2>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <img src="https://placehold.co/150x50/0D47A1/FFFFFF?text=INTI+Logo" alt="INTI International University Logo" className="uni-logo" />
            <h4>Organized By</h4>
            <p>Theme of organiser name from INTI</p>
          </div>
          <div className="info-card">
            <h4>Chief Guest & Keynote Speaker</h4>
            <p>Names to be announced soon.</p>
          </div>
          <div className="info-card">
            <h4>Conference Co-Chair</h4>
            <p>Name to be announced soon.</p>
          </div>
          <div className="info-card">
            <h4>Book Chapter Chief Editor</h4>
            <p>One editor from INTI to be announced.</p>
          </div>
          <div className="info-card">
            <h4>Paper Evaluators</h4>
            <p>A diverse list of experts will be announced.</p>
          </div>
          <div className="info-card">
            <h4>Publication & Indexing</h4>
            <p>Contact Dr. Asokan Vasudevan for ISBN, Scopus Journals, and publisher coordination.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organizers;
