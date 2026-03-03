import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import IdeaCard from '../components/IdeaCard';
import StatCard from '../components/StatCard';

export default function UserDashboard() {
    const { ideas, submissions, recommendations, lastFormData } = useApp();
    const latest = submissions[0];

    return (
        <div className="page dashboard-page">
            <div className="page-hero page-hero--sm">
                <h1>My Dashboard</h1>
                <p>Track your property journey and recommendations</p>
            </div>

            <section className="section">
                <div className="stats-row">
                    <StatCard icon="💡" label="Total Ideas Available" value={ideas.length} color="blue" />
                    <StatCard icon="📋" label="My Submissions" value={submissions.length} color="indigo" />
                    <StatCard icon="⭐" label="Recommendations" value={recommendations.length || '—'} color="green" />
                    <StatCard icon="📈" label="Potential Value Increase" value="Up to 15%" color="orange" />
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="actions-grid">
                        <Link to="/submit" className="action-card">
                            <span>📋</span>
                            <h4>Submit Property</h4>
                            <p>Get fresh recommendations</p>
                        </Link>
                        <Link to="/recommendations" className="action-card">
                            <span>💡</span>
                            <h4>View Recommendations</h4>
                            <p>See your personalised ideas</p>
                        </Link>
                        <Link to="/browse" className="action-card">
                            <span>🔍</span>
                            <h4>Browse All Ideas</h4>
                            <p>Explore all improvements</p>
                        </Link>
                        <Link to="/contact" className="action-card">
                            <span>📞</span>
                            <h4>Contact Us</h4>
                            <p>Get expert advice</p>
                        </Link>
                    </div>
                </div>

                {/* Latest Submission */}
                {latest && (
                    <div className="dashboard-section">
                        <h3>Latest Submission</h3>
                        <div className="submission-card">
                            <div className="submission-info">
                                <span className="info-badge">{latest.propertyType}</span>
                                <h4>{latest.city}</h4>
                                <div className="sub-meta">
                                    <span>{latest.squareFeet} sq.ft</span>
                                    <span>Condition: {latest.condition}</span>
                                    <span>Budget: ₹{(latest.budget / 100000).toFixed(1)}L</span>
                                    <span>{latest.yearsOld} years old</span>
                                </div>
                                <p className="sub-date">Submitted: {latest.submittedAt}</p>
                            </div>
                            <Link to="/recommendations" className="btn btn-primary btn-sm">
                                View Recommendations →
                            </Link>
                        </div>
                    </div>
                )}

                {/* Top Ideas */}
                {recommendations.length > 0 && (
                    <div className="dashboard-section">
                        <h3>Your Top Recommendations</h3>
                        <div className="ideas-grid">
                            {recommendations.slice(0, 3).map((idea) => (
                                <IdeaCard key={idea.id} idea={idea} compact />
                            ))}
                        </div>
                    </div>
                )}

                {recommendations.length === 0 && (
                    <div className="cta-box">
                        <span>🏠</span>
                        <h3>Get Your Recommendations</h3>
                        <p>Submit your property details to unlock personalised improvement ideas.</p>
                        <Link to="/submit" className="btn btn-primary">Submit Now →</Link>
                    </div>
                )}
            </section>
        </div>
    );
}
