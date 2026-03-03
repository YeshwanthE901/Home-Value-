import { createContext, useContext, useState } from 'react';
import { ideas as initialIdeas } from '../data/ideas';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null); // { name, role }
    const [ideas, setIdeas] = useState(initialIdeas);
    const [submissions, setSubmissions] = useState([
        {
            id: 1,
            ownerName: 'Ravi Kumar',
            city: 'Bangalore',
            propertyType: 'Independent House',
            squareFeet: 1200,
            condition: 'Average',
            budget: 300000,
            yearsOld: 12,
            submittedAt: '2024-01-15',
        },
        {
            id: 2,
            ownerName: 'Priya Sharma',
            city: 'Mumbai',
            propertyType: 'Apartment',
            squareFeet: 850,
            condition: 'Good',
            budget: 150000,
            yearsOld: 5,
            submittedAt: '2024-02-03',
        },
        {
            id: 3,
            ownerName: 'Anil Mehta',
            city: 'Pune',
            propertyType: 'Independent House',
            squareFeet: 1800,
            condition: 'Poor',
            budget: 700000,
            yearsOld: 25,
            submittedAt: '2024-02-18',
        },
    ]);
    const [recommendations, setRecommendations] = useState([]);
    const [valueEstimate, setValueEstimate] = useState(null);
    const [lastFormData, setLastFormData] = useState(null);

    // Auth
    const login = (credentials) => {
        if (
            credentials.email === 'admin@homevalue.in' &&
            credentials.password === 'admin123'
        ) {
            setUser({ name: 'Admin User', role: 'admin', email: credentials.email });
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    // Ideas CRUD
    const addIdea = (idea) => {
        setIdeas((prev) => [
            ...prev,
            { ...idea, id: Date.now(), budgetTier: idea.budgetTier || 'medium' },
        ]);
    };

    const updateIdea = (id, updated) => {
        setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    };

    const deleteIdea = (id) => {
        setIdeas((prev) => prev.filter((i) => i.id !== id));
    };

    // Submissions
    const addSubmission = (submission) => {
        const newSub = {
            ...submission,
            id: Date.now(),
            submittedAt: new Date().toISOString().split('T')[0],
        };
        setSubmissions((prev) => [newSub, ...prev]);
        return newSub;
    };

    return (
        <AppContext.Provider
            value={{
                user,
                login,
                logout,
                ideas,
                addIdea,
                updateIdea,
                deleteIdea,
                submissions,
                addSubmission,
                recommendations,
                setRecommendations,
                valueEstimate,
                setValueEstimate,
                lastFormData,
                setLastFormData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
