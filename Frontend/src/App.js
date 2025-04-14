import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UsersPage from './components/User/UsersPage'; // Import UsersPage component
import UserRoutes from './routes/UserRoutes';  // Assuming your login/register routes are defined here
import Dashboard from './components/Dashboard/dashboard';
import './App.css'; // Ensure the correct CSS file is linked

const App = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Router>
            <div>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/users" />} />
                        {/* UsersPage will be shown for /users route */}
                        <Route path="/users" element={<UsersPage />} />
                        {/* Your existing UserRoutes for login/register */}
                        <Route path="/users/*" element={<UserRoutes />} />
                        <Route
                            path="/dashboard"
                            element={
                                user ? <Dashboard /> : <Navigate to="/users" />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
