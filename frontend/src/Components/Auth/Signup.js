import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <SignupStyled>
            <div className="auth-container">
                <h2>Sign Up</h2>
                <form>
                    <div className="input-control">
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-control">
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-control">
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </SignupStyled>
    )
}

const SignupStyled = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(252, 246, 249, 0.78);
    
    .auth-container {
        background: white;
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        padding: 2rem;
        width: 360px;
        box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
    }

    h2 {
        text-align: center;
        color: var(--primary-color);
        margin-bottom: 2rem;
        font-size: 1.8rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .input-control {
        input {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #fff;
            border-radius: 8px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            background: rgba(252, 246, 249, 0.78);
            outline: none;
            
            &:focus {
                border-color: var(--primary-color);
            }

            &::placeholder {
                color: rgba(34, 34, 96, 0.4);
            }
        }
    }

    button {
        padding: 0.8rem;
        border: none;
        background: var(--primary-color);
        color: white;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
            background: rgba(34, 34, 96, 0.8);
            transform: translateY(-2px);
        }
    }

    .login-link {
        text-align: center;
        margin-top: 1.5rem;
        color: rgba(34, 34, 96, 0.6);
        
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

    @media (max-width: 500px) {
        .auth-container {
            width: 90%;
            margin: 0 1rem;
        }
    }
`;

export default Signup