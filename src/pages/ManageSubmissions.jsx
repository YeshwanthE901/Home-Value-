import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ManageSubmissions() {
    const { submissions } = useApp();
    const [search, setSearch] = useState('');
    const [filterCondition, setFilterCondition] = useState('All');
    const [filterType, setFilterType] = useState('All');

    const filtered = submissions.filter((s) => {
        const matchSearch =
            s.city?.toLowerCase().includes(search.toLowerCase()) ||
            s.ownerName?.toLowerCase().includes(search.toLowerCase());
        const matchCond = filterCondition === 'All' || s.condition === filterCondition;
        const matchType = filterType === 'All' || s.propertyType === filterType;
        return matchSearch && matchCond && matchType;
    });

    // Export as CSV
    const exportCSV = () => {
        const headers = ['Owner', 'City', 'Type', 'Sq.Ft', 'Condition', 'Budget (₹)', 'Age (yrs)', 'Date'];
        const rows = submissions.map((s) => [
            s.ownerName, s.city, s.propertyType, s.squareFeet,
            s.condition, s.budget, s.yearsOld, s.submittedAt,
        ]);
        const csvContent = [headers, ...rows].map((r) => r.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'submissions.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="admin-page">
            <div className="admin-section-header">
                <div>
                    <h2>Property Submissions</h2>
                    <p>{submissions.length} total submissions</p>
                </div>
                <button onClick={exportCSV} className="btn btn-outline">
                    ⬇ Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="table-filters">
                <input
                    type="text"
                    placeholder="🔍 Search by name or city..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input search-input--sm"
                />
                <select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)}>
                    <option value="All">All Conditions</option>
                    <option>Poor</option>
                    <option>Average</option>
                    <option>Good</option>
                </select>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option>Apartment</option>
                    <option>Independent House</option>
                </select>
            </div>

            <p className="results-count">{filtered.length} results</p>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Owner</th>
                            <th>City</th>
                            <th>Type</th>
                            <th>Sq.Ft</th>
                            <th>Condition</th>
                            <th>Budget</th>
                            <th>Age</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="table-empty">No submissions found.</td>
                            </tr>
                        ) : (
                            filtered.map((s, idx) => (
                                <tr key={s.id}>
                                    <td className="text-muted">{idx + 1}</td>
                                    <td><strong>{s.ownerName}</strong></td>
                                    <td>{s.city}</td>
                                    <td>
                                        <span className="info-badge">{s.propertyType === 'Apartment' ? '🏢' : '🏠'} {s.propertyType}</span>
                                    </td>
                                    <td>{s.squareFeet}</td>
                                    <td>
                                        <span className={`condition-badge condition--${s.condition?.toLowerCase()}`}>
                                            {s.condition}
                                        </span>
                                    </td>
                                    <td>₹{(parseFloat(s.budget) / 100000).toFixed(1)}L</td>
                                    <td>{s.yearsOld} yrs</td>
                                    <td className="text-muted">{s.submittedAt}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
