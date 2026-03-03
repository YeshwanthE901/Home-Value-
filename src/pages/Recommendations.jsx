import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import IdeaCard from '../components/IdeaCard';

export default function Recommendations() {
    const { recommendations, valueEstimate, lastFormData } = useApp();
    const navigate = useNavigate();

    if (!recommendations || recommendations.length === 0) {
        return (
            <div className="page recommendations-page">
                <div className="empty-page">
                    <span>📋</span>
                    <h2>No Recommendations Yet</h2>
                    <p>Submit your property details to get personalised suggestions.</p>
                    <Link to="/submit" className="btn btn-primary">Submit Property →</Link>
                </div>
            </div>
        );
    }

    const budgetFormatted = lastFormData?.budget
        ? `₹${(parseFloat(lastFormData.budget) / 100000).toFixed(1)}L`
        : '';

    return (
        <div className="page recommendations-page">
            <div className="page-hero page-hero--sm">
                <h1>Your Personalised Recommendations</h1>
                <p>
                    Based on your {lastFormData?.propertyType} in {lastFormData?.city} · Budget {budgetFormatted}
                </p>
            </div>

            <section className="section">
                {/* Value Estimate Banner */}
                {valueEstimate && (
                    <div className="value-banner">
                        <div className="value-banner-content">
                            <div className="value-icon">📈</div>
                            <div>
                                <h2>
                                    Estimated Value Increase:{' '}
                                    <span className="value-range">
                                        {valueEstimate.low}% – {valueEstimate.high}%
                                    </span>
                                </h2>
                                <p>
                                    If you implement the top recommendations below, your property
                                    could increase in market value by{' '}
                                    <strong>{valueEstimate.low}% to {valueEstimate.high}%</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Property Summary */}
                {lastFormData && (
                    <div className="property-summary">
                        <h3>Property Summary</h3>
                        <div className="summary-grid">
                            <div className="summary-item">
                                <span className="summary-label">Location</span>
                                <span className="summary-value">{lastFormData.city}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Type</span>
                                <span className="summary-value">{lastFormData.propertyType}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Size</span>
                                <span className="summary-value">{lastFormData.squareFeet} sq.ft</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Condition</span>
                                <span className={`summary-value condition--${lastFormData.condition?.toLowerCase()}`}>
                                    {lastFormData.condition}
                                </span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Age</span>
                                <span className="summary-value">{lastFormData.yearsOld} years</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Budget</span>
                                <span className="summary-value">{budgetFormatted}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recommendations Grid */}
                <h3 className="rec-heading">
                    Top {recommendations.length} Recommendations for You
                </h3>
                <div className="ideas-grid">
                    {recommendations.map((idea) => (
                        <IdeaCard key={idea.id} idea={idea} />
                    ))}
                </div>

                <div className="rec-actions">
                    <button onClick={() => navigate('/submit')} className="btn btn-outline">
                        ← Re-submit with different details
                    </button>
                    <Link to="/browse" className="btn btn-primary">
                        Browse All Ideas →
                    </Link>
                </div>
            </section>
        </div>
    );
}
