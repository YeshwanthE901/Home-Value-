import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
    const { user, logout } = useApp();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <span className="brand-icon">🏡</span>
                    <span className="brand-name">HomeValue<span className="brand-plus">+</span></span>
                </Link>
            </div>

            <ul className="navbar-links">
                <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                <li><NavLink to="/browse" className={({ isActive }) => isActive ? 'active' : ''}>Browse Ideas</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
                <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
            </ul>

            <div className="navbar-actions">
                {user ? (
                    <>
                        {user.role === 'admin' ? (
                            <Link to="/admin" className="btn btn-outline btn-sm">Admin Panel</Link>
                        ) : (
                            <Link to="/dashboard" className="btn btn-outline btn-sm">Dashboard</Link>
                        )}
                        <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/submit" className="btn btn-outline btn-sm">Get Started</Link>
                        <Link to="/login" className="btn btn-primary btn-sm">Admin Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
