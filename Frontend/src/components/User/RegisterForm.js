import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { registerUser } from '../../services/userService';
import './RegisterForm.css';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Apply background gradient when the component mounts
    useEffect(() => {
        const originalBackground = document.body.style.background;
        document.body.style.background = 'linear-gradient(to right, #6a11cb, #396fce)';

        // Cleanup to revert background when the component unmounts
        return () => {
            document.body.style.background = originalBackground;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password };

        try {
            await registerUser(userData);
            alert('Registration successful!');
            setName('');
            setEmail('');
            setPassword('');
            navigate('/users/login'); // Redirect to login page
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="form-input"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="form-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="form-input"
                />
                <button type="submit" className="form-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
