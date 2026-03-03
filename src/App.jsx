import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import BrowseIdeas from './pages/BrowseIdeas';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SubmitProperty from './pages/SubmitProperty';
import Recommendations from './pages/Recommendations';
import UserDashboard from './pages/UserDashboard';

import AdminDashboard from './pages/AdminDashboard';
import ManageIdeas from './pages/ManageIdeas';
import ManageSubmissions from './pages/ManageSubmissions';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public + User routes — Main Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/browse" element={<BrowseIdeas />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/submit" element={<SubmitProperty />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Admin routes — Admin Layout (protected) */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/ideas" element={<ManageIdeas />} />
            <Route path="/admin/submissions" element={<ManageSubmissions />} />
          </Route>

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="page" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <h1 style={{ fontSize: '4rem' }}>404</h1>
                <p>Page not found.</p>
                <a href="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
