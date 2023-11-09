import {NavLink} from "react-router-dom";

function NavBar({user, logout}){
    return (
        <nav id = 'nav1'>
            <div id = 'nav'>
            <NavLink className = 'links' to = '/home'>Expenses</NavLink>
            <NavLink className = 'links' to = {`/${user.username}/history`}>History</NavLink>
            <NavLink className = 'links' to = {`/${user.username}`}>Profile</NavLink>
            <NavLink className = 'links' to = '/' onClick = {logout}> Logout</NavLink>
            </div>
        </nav>
    )
}

export default NavBar