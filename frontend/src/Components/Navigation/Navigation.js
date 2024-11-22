import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from '../../context/globalContext' // Add this import

function Navigation({active, setActive}) {
    const {user, logout} = useGlobalContext() // Add this line
    
    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>{user ? user.username : 'Guest'}</h2> {/* Update this line */}
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                {user ? (
                    <li onClick={logout}>
                        {signout} Sign Out
                    </li>
                ) : (
                    <>
                        <li onClick={() => setActive(5)}>
                            Login
                        </li>
                        <li onClick={() => setActive(6)}>
                            Sign Up
                        </li>
                    </>
                )}
            </div>
        </NavStyled>
    )
}

// Keep the existing NavStyled component styling
const NavStyled = styled.nav`
    // ... (keep existing styles)

    // Add styles for login/signup items
    .bottom-nav{
        li{
            cursor: pointer;
            color: rgba(34, 34, 96, .6);
            font-weight: 500;
            transition: all .4s ease-in-out;
            display: flex;
            align-items: center;
            gap: .5rem;
            &:hover{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
`;

export default Navigation