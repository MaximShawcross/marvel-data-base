import { Link, NavLink} from 'react-router-dom';

import './app-header.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to = "/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end className={({isActive }) =>  isActive ? 'link' : null} 
                        to = "/">Characters</NavLink></li>
                    /
                    <li><NavLink className={({isActive }) =>  isActive ? 'link' : null}  
                        to = "comics">Comics</NavLink></li>
                </ul>
            </nav>

        </header>
    )
}

export default AppHeader;