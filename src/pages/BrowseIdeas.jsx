import { useState } from 'react';
import { useApp } from '../context/AppContext';
import IdeaCard from '../components/IdeaCard';
import { categories } from '../data/ideas';

export default function BrowseIdeas() {
    const { ideas } = useApp();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = ideas.filter((idea) => {
        const matchCat = activeCategory === 'All' || idea.category === activeCategory;
        const matchSearch =
            idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            idea.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="page browse-page">
            <div className="page-hero page-hero--sm">
                <h1>Browse Improvement Ideas</h1>
                <p>Explore {ideas.length} proven ways to increase your property value</p>
            </div>

            <section className="section">
                {/* Filters */}
                <div className="browse-controls">
                    <input
                        type="text"
                        placeholder="🔍 Search ideas..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="category-pills">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`pill ${activeCategory === cat ? 'pill--active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                <p className="results-count">{filtered.length} ideas found</p>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="ideas-grid">
                        {filtered.map((idea) => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <span>🔎</span>
                        <p>No ideas found for your search.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
