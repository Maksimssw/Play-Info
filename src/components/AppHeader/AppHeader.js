import { NavLink } from "react-router-dom"
import './AppHeader.scss';
import { useState } from "react";

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
                </ul>
            </div>
        </section>
       </>
    )
}

export default AppHeader