import Logo from './Logo/Logo.jpeg'
import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
        <div id = 'subLogo'>
            <div id = 'logo'>
                <Link to = '/home'>
                    <img src = {Logo} alt = 'Logo' id = 'image'/>
                </Link>
            <div id = 'header'>
                <h1>TrackerQue</h1>
            </div>
            </div>
        </div>
    )
}

export default Header