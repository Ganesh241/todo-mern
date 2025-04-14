import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from '../components/User/RegisterForm';
import Login from '../components/User/Login';

const UserRoutes = () => (
    <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
    </Routes>
);

export default UserRoutes;