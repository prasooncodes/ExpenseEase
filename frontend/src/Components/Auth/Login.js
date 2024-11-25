// Login.js
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/globalContext'
import styled from 'styled-components'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useGlobalContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        const result = await login(email, password)
        if (result.success) {
            navigate('/dashboard')
        } else {
            setError(result.error)
        }
    }

    return (
        <LoginStyled>
            <div className="auth-container">
                <h2>Welcome to ExpenseEase</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="auth-footer">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </LoginStyled>
    )
}

const LoginStyled = styled.div`
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

export default Login;