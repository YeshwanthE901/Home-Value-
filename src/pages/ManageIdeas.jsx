import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/ideas';

const emptyIdea = {
    title: '',
    description: '',
    category: 'Interior',
    costRange: '',
    valueIncrease: '',
    tags: ['Apartment', 'Independent House'],
    budgetTier: 'medium',
    icon: '🏠',
};

export default function ManageIdeas() {
    const { ideas, addIdea, updateIdea, deleteIdea } = useApp();
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyIdea);
    const [toast, setToast] = useState('');

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const openAdd = () => {
        setEditingId(null);
        setForm(emptyIdea);
        setShowModal(true);
    };

    const openEdit = (idea) => {
        setEditingId(idea.id);
        setForm({ ...idea });
        setShowModal(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingId) {
            updateIdea(editingId, form);
            showToast('✅ Idea updated successfully!');
        } else {
            addIdea(form);
            showToast('✅ Idea added successfully!');
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this idea?')) {
            deleteIdea(id);
            showToast('🗑 Idea deleted.');
        }
    };

    const set = (field) => (e) =>
        setForm({ ...form, [field]: e.target.value });

    const toggleTag = (tag) => {
        const tags = form.tags.includes(tag)
            ? form.tags.filter((t) => t !== tag)
            : [...form.tags, tag];
        setForm({ ...form, tags });
    };

    return (
        <div className="admin-page">
            {toast && <div className="admin-toast">{toast}</div>}

            <div className="admin-section-header">
                <div>
                    <h2>Manage Improvement Ideas</h2>
                    <p>{ideas.length} ideas in the platform</p>
                </div>
                <button onClick={openAdd} className="btn btn-primary">
                    + Add New Idea
                </button>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Cost Range</th>
                            <th>Value Increase</th>
                            <th>Budget Tier</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ideas.map((idea) => (
                            <tr key={idea.id}>
                                <td style={{ fontSize: '1.4rem' }}>{idea.icon}</td>
                                <td><strong>{idea.title}</strong></td>
                                <td>
                                    <span className={`idea-badge idea-badge--${idea.category.toLowerCase()}`}>
                                        {idea.category}
                                    </span>
                                </td>
                                <td>{idea.costRange}</td>
                                <td className="text-green">{idea.valueIncrease}</td>
                                <td style={{ textTransform: 'capitalize' }}>{idea.budgetTier}</td>
                                <td>
                                    <div className="action-btns">
                                        <button onClick={() => openEdit(idea)} className="btn btn-outline btn-xs">Edit</button>
                                        <button onClick={() => handleDelete(idea.id)} className="btn btn-danger btn-xs">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingId ? 'Edit Idea' : 'Add New Idea'}</h3>
                            <button onClick={() => setShowModal(false)} className="modal-close">✕</button>
                        </div>
                        <form onSubmit={handleSave} className="modal-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Icon (emoji)</label>
                                    <input type="text" value={form.icon} onChange={set('icon')} maxLength={2} />
                                </div>
                                <div className="form-group" style={{ flex: 3 }}>
                                    <label>Title</label>
                                    <input type="text" value={form.title} onChange={set('title')} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows={3} value={form.description} onChange={set('description')} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select value={form.category} onChange={set('category')}>
                                        {categories.filter((c) => c !== 'All').map((c) => (
                                            <option key={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Budget Tier</label>
                                    <select value={form.budgetTier} onChange={set('budgetTier')}>
                                        <option value="low">Low (&lt; ₹2L)</option>
                                        <option value="medium">Medium (₹2L–₹5L)</option>
                                        <option value="high">High (&gt; ₹5L)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Cost Range</label>
                                    <input type="text" placeholder="₹50K – ₹1.5L" value={form.costRange} onChange={set('costRange')} required />
                                </div>
                                <div className="form-group">
                                    <label>Value Increase</label>
                                    <input type="text" placeholder="3–6%" value={form.valueIncrease} onChange={set('valueIncrease')} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Applicable For</label>
                                <div className="tag-checks">
                                    {['Apartment', 'Independent House'].map((tag) => (
                                        <label key={tag} className={`radio-btn ${form.tags.includes(tag) ? 'selected' : ''}`}>
                                            <input
                                                type="checkbox"
                                                checked={form.tags.includes(tag)}
                                                onChange={() => toggleTag(tag)}
                                            />
                                            {tag}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                                <button type="submit" className="btn btn-primary">
                                    {editingId ? 'Update Idea' : 'Add Idea'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
