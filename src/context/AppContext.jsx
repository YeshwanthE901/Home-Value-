import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null); // { name, role, email }
    const [ideas, setIdeas] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [valueEstimate, setValueEstimate] = useState(null);
    const [lastFormData, setLastFormData] = useState(null);

    // Fetch initial ideas on mount
    useEffect(() => {
        fetchIdeas();
        // Check if user is already logged in (token exists)
        const token = localStorage.getItem('token');
        if (token) {
            // A simple decode to set user state could go here, 
            // but assuming basic admin for now
            setUser({ name: 'Admin User', role: 'admin' });
            fetchSubmissions();
        }
    }, []);

    const fetchIdeas = async () => {
        try {
            const data = await apiFetch('/ideas');
            setIdeas(data);
        } catch (error) {
            console.error('Failed to fetch ideas:', error);
        }
    };

    const fetchSubmissions = async () => {
        try {
            const data = await apiFetch('/submissions');
            setSubmissions(data);
        } catch (error) {
            console.error('Failed to fetch submissions:', error);
        }
    };

    // Auth
    const login = async (credentials) => {
        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            });
            localStorage.setItem('token', data.token);
            setUser({ name: 'Admin User', role: 'admin', email: credentials.email });
            fetchSubmissions();
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setSubmissions([]);
    };

    // Ideas CRUD
    const addIdea = async (idea) => {
        try {
            const newIdea = await apiFetch('/ideas', {
                method: 'POST',
                body: JSON.stringify(idea),
            });
            setIdeas((prev) => [newIdea, ...prev]);
        } catch (error) {
            console.error('Failed to add idea:', error);
            throw error;
        }
    };

    const updateIdea = async (id, updated) => {
        try {
            const updatedIdea = await apiFetch(`/ideas/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updated),
            });
            setIdeas((prev) => prev.map((i) => (i._id === id ? updatedIdea : i)));
        } catch (error) {
            console.error('Failed to update idea:', error);
            throw error;
        }
    };

    const deleteIdea = async (id) => {
        try {
            await apiFetch(`/ideas/${id}`, { method: 'DELETE' });
            setIdeas((prev) => prev.filter((i) => i._id !== id));
        } catch (error) {
            console.error('Failed to delete idea:', error);
            throw error;
        }
    };

    // Submissions
    const addSubmission = async (submission) => {
        try {
            const newSub = await apiFetch('/submissions', {
                method: 'POST',
                body: JSON.stringify(submission),
            });
            setSubmissions((prev) => [newSub, ...prev]);
            return newSub;
        } catch (error) {
            console.error('Failed to add submission:', error);
            throw error;
        }
    };

    return (
        <AppContext.Provider
            value={{
                user,
                login,
                logout,
                ideas,
                fetchIdeas,
                addIdea,
                updateIdea,
                deleteIdea,
                submissions,
                addSubmission,
                fetchSubmissions,
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
