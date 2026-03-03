import { ideas } from '../data/ideas';

/**
 * Returns recommended ideas based on property form input.
 * @param {Object} formData - { budget, condition, propertyType, squareFeet, yearsOld }
 */
export function getRecommendations(formData) {
    const { budget, condition, propertyType } = formData;
    const budgetNum = parseFloat(budget) || 0;

    // Determine budget tier
    let budgetTier = 'low';
    if (budgetNum >= 200000 && budgetNum < 500000) budgetTier = 'medium';
    if (budgetNum >= 500000) budgetTier = 'high';

    // Filter ideas by property type compatibility
    const filtered = ideas.filter((idea) => idea.tags.includes(propertyType));

    // Score each idea
    const scored = filtered.map((idea) => {
        let score = 0;

        // Budget tier match
        if (idea.budgetTier === budgetTier) score += 3;
        if (idea.budgetTier === 'low' && budgetTier !== 'low') score += 1;

        // Poor condition → prioritise structural / bathroom / interior
        if (condition === 'Poor') {
            if (['Structural', 'Interior'].includes(idea.category)) score += 2;
        }
        // Average condition → kitchen, flooring, technology
        if (condition === 'Average') {
            if (['Interior', 'Technology'].includes(idea.category)) score += 2;
        }
        // Good condition → energy, investment, exterior
        if (condition === 'Good') {
            if (['Energy', 'Investment', 'Exterior'].includes(idea.category))
                score += 2;
        }

        return { ...idea, score };
    });

    // Sort by score descending, return top 6
    return scored.sort((a, b) => b.score - a.score).slice(0, 6);
}

/**
 * Estimate value increase percentage based on budget tier and condition.
 */
export function getValueEstimate(formData) {
    const { budget, condition } = formData;
    const budgetNum = parseFloat(budget) || 0;

    let base = 0;
    if (budgetNum < 200000) base = 4;
    else if (budgetNum < 500000) base = 9;
    else base = 15;

    // Condition modifier
    const modifier =
        condition === 'Poor' ? 1.3 : condition === 'Average' ? 1.1 : 1.0;

    const low = Math.round(base * 0.8 * modifier);
    const high = Math.round(base * modifier);
    return { low, high };
}
