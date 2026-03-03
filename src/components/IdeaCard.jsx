export default function IdeaCard({ idea, compact = false }) {
    return (
        <div className={`idea-card ${compact ? 'idea-card--compact' : ''}`}>
            <div className="idea-card-icon">{idea.icon}</div>
            <div className="idea-card-body">
                <span className={`idea-badge idea-badge--${idea.category.toLowerCase()}`}>
                    {idea.category}
                </span>
                <h3 className="idea-card-title">{idea.title}</h3>
                {!compact && (
                    <p className="idea-card-desc">{idea.description}</p>
                )}
                <div className="idea-card-meta">
                    <span className="meta-item">
                        <span className="meta-label">Cost</span>
                        <span className="meta-value">{idea.costRange}</span>
                    </span>
                    <span className="meta-item">
                        <span className="meta-label">Value ↑</span>
                        <span className="meta-value meta-value--green">{idea.valueIncrease}</span>
                    </span>
                </div>
                <div className="idea-card-tags">
                    {idea.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
