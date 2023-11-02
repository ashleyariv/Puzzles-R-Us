import {NavLink} from "react-router-dom";

function NavBar({user, logout}){
    return (
        <nav>
            <NavLink to = '/home'>Expenses</NavLink>
            {/* <NavLink>Paid Expenses</NavLink> */}
            <NavLink to = {`/${user.username}`}>Profile</NavLink>
            <button onClick = {logout}>
                <NavLink to = '/'>Logout</NavLink>
            </button>
        </nav>
    )
}

export default NavBar