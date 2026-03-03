import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
    const { login } = useApp();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        await new Promise((r) => setTimeout(r, 600));

        const success = login(form);
        setLoading(false);

        if (success) {
            navigate('/admin');
        } else {
            setError('Invalid email or password. Use admin@homevalue.in / admin123');
        }
    };

    return (
        <div className="page login-page">
            <div className="login-card">
                <div className="login-brand">
                    <span>🏡</span>
                    <h2>HomeValue<span className="brand-plus">+</span></h2>
                </div>
                <h3>Admin Login</h3>
                <p className="login-hint">Use: admin@homevalue.in / admin123</p>

                {error && <div className="alert alert--error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="admin@homevalue.in"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                </form>
            </div>
        </div>
    );
}
