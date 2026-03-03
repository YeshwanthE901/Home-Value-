import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { categories } from '../data/ideas';

export default function AdminDashboard() {
    const { ideas, submissions } = useApp();

    // Analytics calculations
    const categoryCounts = categories
        .filter((c) => c !== 'All')
        .map((cat) => ({
            cat,
            count: ideas.filter((i) => i.category === cat).length,
        }))
        .sort((a, b) => b.count - a.count);

    const mostPopular = categoryCounts[0];

    const conditionCounts = ['Poor', 'Average', 'Good'].map((c) => ({
        condition: c,
        count: submissions.filter((s) => s.condition === c).length,
    }));

    const avgBudget =
        submissions.length > 0
            ? Math.round(
                submissions.reduce((sum, s) => sum + parseFloat(s.budget || 0), 0) /
                submissions.length /
                100000
            )
            : 0;

    const recentSubmissions = submissions.slice(0, 5);

    return (
        <div className="admin-page">
            <div className="admin-section-header">
                <h2>Dashboard Overview</h2>
                <p>Real-time insights across the platform</p>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <StatCard icon="💡" label="Total Ideas" value={ideas.length} color="blue" />
                <StatCard icon="📋" label="Submissions" value={submissions.length} color="indigo" />
                <StatCard icon="🏆" label="Top Category" value={mostPopular?.cat || '—'} color="green" />
                <StatCard icon="💰" label="Avg Budget" value={`₹${avgBudget}L`} color="orange" />
            </div>

            <div className="dashboard-grid">
                {/* Category breakdown */}
                <div className="dashboard-widget">
                    <h3>Ideas by Category</h3>
                    <div className="bar-chart">
                        {categoryCounts.map(({ cat, count }) => (
                            <div className="bar-row" key={cat}>
                                <span className="bar-label">{cat}</span>
                                <div className="bar-track">
                                    <div
                                        className="bar-fill"
                                        style={{ width: `${(count / ideas.length) * 100}%` }}
                                    />
                                </div>
                                <span className="bar-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Condition breakdown */}
                <div className="dashboard-widget">
                    <h3>Submissions by Condition</h3>
                    <div className="donut-list">
                        {conditionCounts.map(({ condition, count }) => (
                            <div className="donut-item" key={condition}>
                                <div className={`donut-dot condition--${condition.toLowerCase()}`} />
                                <span className="donut-label">{condition}</span>
                                <span className="donut-count">{count} submissions</span>
                                <div className="donut-bar-track">
                                    <div
                                        className={`donut-bar-fill condition-bar--${condition.toLowerCase()}`}
                                        style={{
                                            width: submissions.length > 0
                                                ? `${(count / submissions.length) * 100}%`
                                                : '0%',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Submissions */}
                <div className="dashboard-widget dashboard-widget--wide">
                    <h3>Recent Submissions</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Owner</th>
                                <th>City</th>
                                <th>Type</th>
                                <th>Condition</th>
                                <th>Budget</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSubmissions.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.ownerName}</td>
                                    <td>{s.city}</td>
                                    <td><span className="info-badge">{s.propertyType}</span></td>
                                    <td>
                                        <span className={`condition-badge condition--${s.condition?.toLowerCase()}`}>
                                            {s.condition}
                                        </span>
                                    </td>
                                    <td>₹{(parseFloat(s.budget) / 100000).toFixed(1)}L</td>
                                    <td>{s.submittedAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
