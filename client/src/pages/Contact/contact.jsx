

import React, { useState } from 'react';
import Map from '../Home/Map';
import './contact.css';
import base_url from '../../config';

const ContactUsPreview = ({ onOpenLogin = () => {} }) => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    message: '',
    proof: null, // To store the file object
  });
  const [fileName, setFileName] = useState(''); // To display the selected file's name
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    if (!form.firstName) errors.firstName = 'First name is required';
    if (!form.lastName) errors.lastName = 'Last name is required';
    if (!form.email) errors.email = 'Email is required';
    else if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(form.email))
      errors.email = 'Invalid email';
    if (!form.contact) errors.contact = 'Contact number is required';
    return errors;
  };

  const errors = validate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setForm((f) => ({ ...f, proof: file }));
      setFileName(file.name);
    } else {
      alert('Only .png and .jpg files are allowed.');
      e.target.value = null;
      setForm((f) => ({ ...f, proof: null }));
      setFileName('');
    }
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setTouched({ firstName: true, lastName: true, email: true, contact: true });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('email', form.email);
    formData.append('mobile', form.contact); // backend expects 'mobile'
    formData.append('message', form.message);

    if (form.proof) {
      formData.append('file', form.proof); // backend expects 'file'
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setIsSubmitting(false);
      onOpenLogin();
      return;
    }

    try {
      const response = await fetch(`${base_url}/enquiries`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Bearer token
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || `Error: ${response.status}`);
        } catch {
          throw new Error(errorText || `Error: ${response.status}`);
        }
      }

      alert("✅ Message sent successfully!");

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        message: "",
        proof: null
      });
      setFileName("");
      setTouched({});
      e.target.reset();

    } catch (error) {
      console.error("Form submission error:", error);
      alert(`❌ Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="contact-page-root">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>

        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">K.S.R. College of Engineering – Get In Touch</h1>
            <p className="page-subtitle">
              Have questions about K.S.R. College of Engineering? We're here to help! Reach out to our team for 
              assistance with admission, campus details, or any other inquiries.
            </p>
          </div>

          <div className="contact-grid-container">
            <section className="form-section">
              <h3>Send us a message</h3>
              <form onSubmit={onSubmit} noValidate>
                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your first name" />
                    {touched.firstName && errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your last name" />
                    {touched.lastName && errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                  <div className="form-field full-width">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your email address" />
                    {touched.email && errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-field full-width">
                    <label htmlFor="contact">Contact Details</label>
                    <div className="contact-input-group">
                      <select>
                        <option>+91</option>
                        <option>+1</option>
                        <option>+44</option>
                        <option>+61</option>
                      </select>
                      <input id="contact" name="contact" type="tel" value={form.contact} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your contact number" />
                    </div>
                    {touched.contact && errors.contact && <span className="error-message">{errors.contact}</span>}
                  </div>
                  <div className="form-field full-width optional">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help you..." />
                  </div>
                  <div className="form-field full-width optional">
                    <label htmlFor="proof">Attach Proof (PNG or JPG only)</label>
                    <div className="file-input-wrapper">
                      <input id="proof" name="proof" type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} className="file-input-hidden" />
                      <label htmlFor="proof" className="file-input-label">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <span>{fileName || "Choose a file..."}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{marginRight: '6px'}}></i>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </section>

            <aside className="info-card-container">
              <h3>Contact Information</h3>
              <div className="info-item interactive">
                <i className="fas fa-phone-alt"></i>
                <div>
                  <strong>Phone:</strong>
                  <span><a href="tel:+919943455245">+91 99434 55245</a></span>
                </div>
              </div>
              <div className="info-item interactive">
                <i className="far fa-envelope"></i>
                <div>
                  <strong>Email:</strong>
                  <span><a href="mailto:principal@ksrce.ac.in">s3conference@ksrce.ac.in</a></span>
                </div>
              </div>
              <div className="info-item interactive">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Address:</strong>
                  <span>K.S.R. College of Engineering, K.S.R. Kalvi Nagar, Tiruchengode – 637 215, Namakkal District, Tamil Nadu, India</span>
                </div>
              </div>
              <div className="info-item interactive">
                <i className="far fa-clock"></i>
                <div>
                  <strong>Website:</strong>
                  <span><a href="https://ksrce.ac.in" target="_blank" rel="noopener noreferrer">ksrce.ac.in</a></span>
                </div>
              </div>
              <div className="social-connect">
                <p>Follow us on social media</p>
                <div className="social-icons">
                  <a href="https://www.instagram.com/ksrce_official/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="https://in.linkedin.com/company/ksrce" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://x.com/ksrceofficial" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="https://www.youtube.com/@KSRCEITES" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
            </aside>
          </div>

          <section className="faq-section">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4><i className="far fa-question-circle"></i>Admissions Process</h4>
                <p>Learn about our admission process, eligibility criteria, and how to apply to K.S.R. College of Engineering.</p>
              </div>
              <div className="faq-item">
                <h4><i className="far fa-question-circle"></i>Campus Facilities</h4>
                <p>Information about hostels, library, labs, and other facilities available for students on campus.</p>
              </div>
              <div className="faq-item">
                <h4><i className="far fa-question-circle"></i>Contact Guidelines</h4>
                <p>Details on how to get in touch with administration, faculty, and support staff effectively.</p>
              </div>
            </div>
          </section>

          <Map/>
        </main>
      </div>
    </>
  );
};

export default ContactUsPreview;