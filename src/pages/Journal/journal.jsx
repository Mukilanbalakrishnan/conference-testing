import React, { useEffect, useRef } from 'react';
import './journal.css';

// --- Icon Components ---
const PublicationIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>);
const ProcessIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>);
const IndexingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const CopyrightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9.354a4 4 0 1 0 0 5.292"/></svg>);
const SupportIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>);

const IconWrapper = ({ children }) => (
  <div className="icon-wrapper">{children}</div>
);

// --- Reusable Components ---
const JournalItem = ({ number, title, eISSN, publisher }) => (
  <div className="journal-item">
    <div className="journal-item-content">
      <div className="journal-item-number">{number}</div>
      <div className="journal-item-details">
        <h4 className="journal-item-title">{title}</h4>
        {eISSN && <p className="journal-item-eissn">eISSN: <span className="eissn-badge">{eISSN}</span></p>}
        {publisher && <p className="journal-item-publisher">{publisher}</p>}
      </div>
    </div>
  </div>
);

const Section = ({ title, icon, children, ...props }) => (
  <section className="section" {...props}>
    <div className="section-header">
      <IconWrapper>{icon}</IconWrapper>
      <h2 className="section-title">{title}</h2>
    </div>
    <div className="section-body">
      {children}
    </div>
  </section>
);

// --- Main Component ---
function Journal() {
  const journals = [
    { title: 'Title of the Book Chapter: “Integrated Sustainable Engineering Solutions: An Intelligent Multidisciplinary Approach”', eISSN: 'ISSN to be announced' },
    { title: 'Journal of Data Science', eISSN: '2805-5160', publisher: '(iPublishing Network, INTI International University)' },
    { title: 'Journal of Innovation and Technology', eISSN: '2805-5179', publisher: '(iPublishing Network, INTI International University)' },
    { title: 'Journal of Business and Social Science', eISSN: '2805-5187', publisher: '(iPublishing Network, INTI International University)' },
    { title: 'INTI Journal', eISSN: '2600-7320', publisher: '(iPublishing Network, INTI International University)' },
  ];

  const pageRef = useRef(null);

  useEffect(() => {
    const elementsToAnimate = pageRef.current.querySelectorAll('.journal-header, .section, .support-section-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    return () => {
        elementsToAnimate.forEach(el => observer.unobserve(el));
    };
}, []);


  return (
    <div className="journal-page" ref={pageRef}>
      <div className="journal-container">
        <div className="journal-content">
          <header className="journal-header">
            <h1>Publication and Journal Information</h1>
            <p>Key details about publication opportunities, submission processes, and author benefits.</p>
          </header>

          <main>
            <Section title="Selected Papers Publication" icon={<PublicationIcon />}>
              <p>Outstanding papers presented at the conference will be considered for publication in a special issue of a reputable journal or an indexed conference proceedings volume.</p>
              <div className="journal-list">
                {journals.map((journal, index) => (
                  <JournalItem key={index} number={index + 1} {...journal} />
                ))}
              </div>
            </Section>

            <Section title="Journal Submission Process" icon={<ProcessIcon />}>
              <p>After acceptance, selected papers will be invited to submit an extended version of their work to a dedicated journal. Each submission will undergo a rigorous peer-review process according to the journal’s standards.</p>
            </Section>

            <Section title="Indexing and Impact" icon={<IndexingIcon />}>
              <p>Published papers will be indexed in major databases such as Scopus, Web of Science, and/or other relevant indexing services depending on the field, ensuring wide visibility and impact.</p>
            </Section>

            <Section title="Copyright and Open Access" icon={<CopyrightIcon />}>
              <p>Authors will retain copyright according to the publication agreement, with options available for open access publishing to increase dissemination.</p>
            </Section>

            <div className="support-section-container">
              <div className="support-card">
                <div className="support-card-content">
                  <div className="support-icon-wrapper">
                    <SupportIcon />
                  </div>
                  <div>
                    <h3 className="support-title">Publication Fee Support</h3>
                    <p className="support-text">
                      Support on publication fees through <strong>APC (Article Processing Charges)</strong> for all publications in Scopus-indexed journals with co-author(s) from INTI IU & KSRCE.
                      <span className="support-terms">(Terms and conditions apply).</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Journal;

