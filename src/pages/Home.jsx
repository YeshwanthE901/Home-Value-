import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import IdeaCard from '../components/IdeaCard';

export default function Home() {
    const { ideas } = useApp();
    const featured = ideas.slice(0, 3);

    return (
        <div className="page home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-badge">🇮🇳 Built for Indian Homeowners</span>
                    <h1 className="hero-title">
                        Unlock the Hidden Value<br />
                        <span className="text-gradient">in Your Home</span>
                    </h1>
                    <p className="hero-subtitle">
                        Discover smart, affordable upgrades that increase your property's market value by up to 15%.
                        Get personalised recommendations based on your property and budget.
                    </p>
                    <div className="hero-actions">
                        <Link to="/submit" className="btn btn-primary btn-lg">
                            Get Free Recommendations →
                        </Link>
                        <Link to="/browse" className="btn btn-outline btn-lg">
                            Browse All Ideas
                        </Link>
                    </div>
                </div>

                <div className="hero-stats">
                    <div className="hero-stat">
                        <h3>500+</h3>
                        <p>Homeowners Helped</p>
                    </div>
                    <div className="hero-stat">
                        <h3>12+</h3>
                        <p>Improvement Ideas</p>
                    </div>
                    <div className="hero-stat">
                        <h3>15%</h3>
                        <p>Max Value Increase</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section">
                <div className="section-header">
                    <h2>How It Works</h2>
                    <p>Three simple steps to unlock your property's potential</p>
                </div>
                <div className="steps-grid">
                    {[
                        { step: '01', icon: '📋', title: 'Submit Your Property', desc: 'Tell us about your home — type, size, condition, and budget.' },
                        { step: '02', icon: '🤖', title: 'Get Recommendations', desc: 'Our smart engine matches the best improvement ideas to your profile.' },
                        { step: '03', icon: '📈', title: 'See Value Increase', desc: "View estimated percentage increase in your property's market value." },
                    ].map((item) => (
                        <div className="step-card" key={item.step}>
                            <span className="step-number">{item.step}</span>
                            <div className="step-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Ideas */}
            <section className="section section--grey">
                <div className="section-header">
                    <h2>Popular Improvements</h2>
                    <p>Top upgrades recommended by our platform</p>
                </div>
                <div className="ideas-grid">
                    {featured.map((idea) => (
                        <IdeaCard key={idea.id} idea={idea} />
                    ))}
                </div>
                <div className="section-cta">
                    <Link to="/browse" className="btn btn-primary">View All Ideas →</Link>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <div className="cta-content">
                    <h2>Ready to Increase Your Property Value?</h2>
                    <p>Fill out a quick form and get personalised recommendations in seconds.</p>
                    <Link to="/submit" className="btn btn-white btn-lg">Start Now — It's Free</Link>
                </div>
            </section>
        </div>
    );
}
