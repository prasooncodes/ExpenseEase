// frontend/src/Components/Auth/Login.js
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/globalContext'
import styled from 'styled-components'

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
            padding: 0.5rem;
            border: 2px solid #ccc;
            border-radius: 5px;
            font-size: 1.1rem;
            
            &:focus {
                border-color: var(--primary-color);
                outline: none;
            }
        }
    }

    button {
        padding: 0.8rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.1rem;

        &:hover {
            background: var(--primary-color3);
        }
    }

    .signup-link {
        margin-top: 1rem;
        text-align: center;
        
        a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: bold;
            
            &:hover {
                text-decoration: underline;
            }
        }
    }
`

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

export default Login