export default function StatCard({ icon, label, value, color = 'blue' }) {
    return (
        <div className={`stat-card stat-card--${color}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-body">
                <p className="stat-label">{label}</p>
                <h2 className="stat-value">{value}</h2>
            </div>
        </div>
    );
}
