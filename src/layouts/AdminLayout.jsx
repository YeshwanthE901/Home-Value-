import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    const { user, logout } = useApp();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-wrapper">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <Link to="/">
                        <span>🏡</span> HomeValue<span className="brand-plus">+</span>
                    </Link>
                    <p className="sidebar-role">Admin Panel</p>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/admin" end className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                        📊 Dashboard
                    </NavLink>
                    <NavLink to="/admin/ideas" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                        💡 Manage Ideas
                    </NavLink>
                    <NavLink to="/admin/submissions" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                        📋 Submissions
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <p className="sidebar-user">👤 {user?.name}</p>
                    <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
                </div>
            </aside>

            {/* Main content */}
            <div className="admin-main">
                <header className="admin-header">
                    <h2>Welcome back, {user?.name} 👋</h2>
                    <Link to="/" className="btn btn-outline btn-sm">← Back to Site</Link>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
