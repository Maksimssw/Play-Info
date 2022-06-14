import { NavLink } from "react-router-dom"
import './AppHeader.scss';

const AppHeader = () => {
    return (
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
                            <NavLink className="menu__link" to="/">Home</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader