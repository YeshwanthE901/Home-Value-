const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://homevalue-plus-backend.onrender.com/api';

/**
 * Custom wrapper for fetch API
 */
export async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Add default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // If there's a token in localStorage, attach it
    const token = localStorage.getItem('token');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
