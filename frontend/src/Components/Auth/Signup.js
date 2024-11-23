// Signup.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/signup', {
                username,
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <SignupStyled>
            <div className="auth-container">
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </SignupStyled>
    )
}

const SignupStyled = styled.div`
    height: 100vh;
    background: linear-gradient(120deg, #f6f7ff 0%, #e9ebff 100%);
    display: flex;
    justify-content: center;
    align-items: center;

    .auth-container {
        background: white;
        border-radius: 20px;
        padding: 3rem 4rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        width: 400px;
        
        h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--primary-color);
            font-size: 2rem;
        }

        .error-message {
            background: #fff2f2;
            color: #ff4444;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            text-align: center;
            font-size: 0.9rem;
        }

        form {
            .input-control {
                margin-bottom: 1.5rem;
                
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: var(--primary-color);
                    font-weight: 500;
                }

                input {
                    width: 100%;
                    padding: 1rem;
                    border: 2px solid #eee;
                    border-radius: 10px;
                    font-size: 1rem;
                    transition: all 0.3s ease;

                    &:focus {
                        border-color: var(--primary-color);
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(34, 34, 96, 0.1);
                    }
                }
            }

            button {
                width: 100%;
                padding: 1rem;
                background: var(--primary-color);
                border: none;
                border-radius: 10px;
                color: white;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background: #1a1a4f;
                    transform: translateY(-2px);
                }
            }
        }

        .auth-footer {
            margin-top: 2rem;
            text-align: center;
            color: #666;
            
            a {
                color: var(--primary-color);
                text-decoration: none;
                font-weight: 600;
                margin-left: 0.5rem;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    @media (max-width: 500px) {
        .auth-container {
            width: 90%;
            padding: 2rem;
        }
    }
`;

export default Signup;