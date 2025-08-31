import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import './Bar.css';

export default function Bar() {
    const navigate = useNavigate();
    
    return (
        <nav className="nav-bar">
            <div className="nav-content">
                <div className="nav-logo" onClick={() => navigate('/')}>
                    <h1 className="logo-text">GameIfy</h1>
                </div>
                
                <div className="nav-actions">
                    <NavLink 
                        className={({ isActive }) => isActive ? "nav-button search-btn active-btn" : "nav-button search-btn"}
                        to='/search'
                    >
                        Search Games
                    </NavLink>
                        <NavLink 
                        className={({ isActive }) => isActive ? "nav-button active-btn" : "nav-button about-btn"}
                        to='/'
                        end
                    >Home</NavLink>
                        <NavLink 
                        className={({ isActive }) => isActive ? "nav-button active-btn" : "nav-button about-btn"}
                        to='/games'
                        end
                    >Games</NavLink>
                    <NavLink 
                        className={({ isActive }) => isActive ? "nav-button active-btn" : "nav-button about-btn"}
                        to='/about'
                        end
                    >
                        About
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}