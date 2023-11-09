import {useState} from 'react'
import { Link } from 'react-router-dom'

function Register({attemptSignup}) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = e => setEmail(e.target.value)
    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    function handleSignup(e) {
        e.preventDefault()
        attemptSignup({email, username, password})
    }

    return (
        <div>
        <div id = 'register'>
            <form onSubmit = {handleSignup} >
                <h2>Signup for an account</h2>
                <p>Email: <input
                    className = 'loginInput'
                    type = 'text'
                    onChange = {handleEmail}
                    value = {email}
                    placeholder = 'email'
                />
                </p>
                <p>Username: <input
                    className = 'loginInput'
                    type = 'text'
                    onChange = {handleUsername}
                    value = {username}
                    placeholder = 'username'
                />
                </p>
                <p>Password: <input
                    className = 'loginInput'
                    type = 'password'
                    onChange = {handlePassword}
                    value = {password}
                    placeholder = 'password'
                />
                </p>
                <input
                    className = 'loginButton'
                    type = 'submit'
                    value = 'Register' 
                />
                <p>Have an account? <Link to = '/'>Login</Link></p>
            </form>
        </div>
        </div>
    )
}

export default Register