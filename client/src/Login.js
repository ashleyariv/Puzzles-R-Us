import {useState} from 'react'
import Register from './Register'

function Login({attemptLogin, attemptSignup}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    function handleLogin(e) {
        e.preventDefault()
        attemptLogin({username, password})
    }

    return (
        <div>
            <h1>Trackerque</h1>
            <form onSubmit = {handleLogin}>
                <input
                    type = 'text'
                    onChange = {handleUsername}
                    value = {username}
                    placeholder = 'username'
                />
                <input
                    type = 'password'
                    onChange = {handlePassword}
                    value = {password}
                    placeholder = 'password'
                />
                <input
                    type = 'submit'
                    value = 'Login' 
                />
            </form>
            <Register attemptSignup = {attemptSignup} />
        </div>
    )
}

export default Login