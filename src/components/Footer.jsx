import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <span className="brand-icon">🏡</span>
                    <span className="brand-name">HomeValue<span className="brand-plus">+</span></span>
                    <p>Helping Indian homeowners unlock the hidden value in their properties through smart, affordable upgrades.</p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/browse">Browse Ideas</Link></li>
                        <li><Link to="/submit">Submit Property</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>📧 hello@homevalueplus.in</p>
                    <p>📞 +91 98765 43210</p>
                    <p>📍 Bangalore, India</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 HomeValue+ · Made with ❤️ for Indian Homeowners</p>
            </div>
        </footer>
    );
}
