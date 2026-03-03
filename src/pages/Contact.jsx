import { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="page contact-page">
            <div className="page-hero page-hero--sm">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you</p>
            </div>

            <section className="section">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <p>Have questions about improving your property value? We're here to help.</p>

                        <div className="contact-items">
                            <div className="contact-item">
                                <span>📧</span>
                                <div>
                                    <h4>Email</h4>
                                    <p>hello@homevalueplus.in</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span>📞</span>
                                <div>
                                    <h4>Phone</h4>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span>📍</span>
                                <div>
                                    <h4>Location</h4>
                                    <p>Bangalore, Karnataka, India</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span>⏰</span>
                                <div>
                                    <h4>Working Hours</h4>
                                    <p>Mon–Sat, 9 AM – 6 PM IST</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrap">
                        {submitted ? (
                            <div className="success-box">
                                <span className="success-icon">✅</span>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <h2>Send a Message</h2>
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Ravi Kumar"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Regarding property recommendations..."
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Tell us how we can help..."
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Send Message →
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
