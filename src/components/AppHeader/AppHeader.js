import { NavLink } from "react-router-dom"
import './AppHeader.scss';
import '../Page/GamePage/GamePage.scss';
import { useState } from "react";
import star from '../img/star.png';

const AppHeader = () => {

    const [activeHamb, setActiveHamb] = useState(false);

    const hamburgerToggle = () => {
        activeHamb ? setActiveHamb(false) : setActiveHamb(true);
    }

    return (
       <>
        <header className="header">
            <div className="container">
                <NavLink to="/" className="header__logo">
                    GAME INFO
                </NavLink>
                <nav>
                    <ul className="menu">
                        <li className="menu__list">
                            <NavLink  className="menu__link" 
                                to="/"
                                style={({isActive}) => ({color: isActive ? '#f49120' : null})}>Платформы</NavLink>
                        </li>
                        <li className="menu__list">
                            <NavLink className="menu__link" 
                                    to="/games"
                                    style={({isActive}) => ({color: isActive ? '#f49120' : null})}>Игры</NavLink>
                        </li>
                        <li className="menu__list">
                            <NavLink className="menu__link" to="/shops"
                                     style={({isActive}) => ({color: isActive ? '#f49120' : null})}>Магазины</NavLink>
                        </li>
                        <li className="menu__list">
                            <NavLink className="menu__link" to="/favorites">
                                <svg 
                                className='game__heart' width="196" height="155" viewBox="0 0 196 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50H100ZM98 98.5L75.269 143.034L98 154.637L120.731 143.034L98 98.5ZM196 50C196 22.3858 173.614 0 146 0C118.386 0 96 22.3858 96 50H196ZM0 50C0 72.3412 10.7891 89.2743 18.3306 98.7797C26.4472 109.01 36.0489 117.205 43.7353 123.05C51.707 129.112 59.4123 133.988 64.9731 137.29C67.8047 138.971 70.2063 140.318 71.972 141.283C72.8576 141.766 73.5909 142.158 74.147 142.451C74.4253 142.598 74.6599 142.72 74.8478 142.817C74.9417 142.866 75.024 142.909 75.0943 142.945C75.1295 142.963 75.1616 142.979 75.1908 142.994C75.2053 143.002 75.2191 143.009 75.2322 143.015C75.2387 143.019 75.2479 143.023 75.2511 143.025C75.2601 143.03 75.269 143.034 98 98.5C120.731 53.9657 120.739 53.9701 120.748 53.9743C120.75 53.9756 120.758 53.9797 120.763 53.9823C120.774 53.9875 120.783 53.9923 120.792 53.9968C120.809 54.0058 120.824 54.0133 120.836 54.0196C120.86 54.032 120.874 54.039 120.877 54.0406C120.883 54.0438 120.848 54.0257 120.775 53.9871C120.628 53.9096 120.33 53.7512 119.903 53.5181C119.044 53.0488 117.695 52.2948 116.027 51.3041C112.588 49.2621 108.293 46.5131 104.265 43.4499C99.9511 40.1698 97.5528 37.74 96.6694 36.6265C95.2109 34.7882 100 39.6588 100 50H0ZM98 98.5C120.731 143.034 120.74 143.03 120.749 143.025C120.752 143.023 120.761 143.019 120.768 143.015C120.781 143.009 120.795 143.002 120.809 142.994C120.838 142.979 120.871 142.963 120.906 142.945C120.976 142.909 121.058 142.866 121.152 142.817C121.34 142.72 121.575 142.598 121.853 142.451C122.409 142.158 123.142 141.766 124.028 141.283C125.794 140.318 128.195 138.971 131.027 137.29C136.588 133.988 144.293 129.112 152.265 123.05C159.951 117.205 169.553 109.01 177.669 98.7797C185.211 89.2743 196 72.3412 196 50H96C96 39.6588 100.789 34.7882 99.3306 36.6265C98.4472 37.74 96.0489 40.1698 91.7353 43.4499C87.707 46.5131 83.4123 49.2621 79.9731 51.3041C78.3047 52.2948 76.9563 53.0488 76.097 53.5181C75.6701 53.7512 75.3722 53.9096 75.2252 53.9871C75.1519 54.0257 75.1169 54.0438 75.1231 54.0406C75.1263 54.039 75.1397 54.032 75.1639 54.0196C75.176 54.0133 75.1908 54.0058 75.2083 53.9968C75.217 53.9923 75.2264 53.9875 75.2365 53.9823C75.2416 53.9797 75.2497 53.9756 75.2522 53.9743C75.2605 53.9701 75.269 53.9657 98 98.5Z" fill={'#808080'} />
                                </svg>
                            </NavLink>
                        </li>
                    </ul>
                    <div tabIndex='0' 
                        className={`hamburger ${activeHamb ? 'active' : ''}`}
                        onClick={hamburgerToggle}>
                        <div className="hamburger__wrapper">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <section className={`subheader ${activeHamb ? 'active' : ''}`} >
            <div className="container">
                <ul  className="menu">
                    <li className="menu__list">
                        <NavLink  className="menu__link" 
                            to="/"
                            style={({isActive}) => ({color: isActive ? '#f49120' : null})}>Платформы</NavLink>
                    </li>
                    <li className="menu__list">
                        <NavLink className="menu__link" 
                                to="/games"
                                style={({isActive}) => ({color: isActive ? '#f49120' : null})}>Игры</NavLink>
                    </li>
                    <li className="menu__list">
                        <NavLink className="menu__link" 
                                 to="/shops"
                                 style={({isActive}) => ({color: isActive ? '#f49120' : null})}>Магазины</NavLink>
                    </li>
                    <li className="menu__list">
                            <NavLink to="/favorites">
                                <img src={star} className="menu__star" alt="star"/>
                            </NavLink>
                        </li>
                </ul>
            </div>
        </section>
       </>
    )
}

export default AppHeader