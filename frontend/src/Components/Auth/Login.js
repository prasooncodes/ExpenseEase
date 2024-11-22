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
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="signup-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </LoginStyled>
    )
}

const LoginStyled = styled.div`
    .auth-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 2rem;
    }

    h2 {
        margin-bottom: 2rem;
        color: var(--primary-color);
    }

    .error-message {
        color: var(--color-delete);
        margin-bottom: 1rem;
        padding: 0.5rem;
        border-radius: 8px;
        background-color: rgba(255, 0, 0, 0.1);
        text-align: center;
        width: 100%;
        max-width: 400px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 400px;
    }

    .input-control {
        width: 100%;
        input {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #ccc;
            border-radius: 8px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            
            &:focus {
                border-color: var(--primary-color);
                outline: none;
            }

            &::placeholder {
                color: rgba(34, 34, 96, 0.4);
            }
        }
    }

    button {
        padding: 0.8rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.1rem;
        transition: all 0.3s ease;

        &:hover {
            background: var(--primary-color3);
            transform: translateY(-2px);
        }
    }

    .signup-link {
        margin-top: 1.5rem;
        text-align: center;
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
            padding: 1rem;
        }
        
        form {
            width: 90%;
        }
    }
`

export default Login