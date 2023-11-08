import {useState} from 'react'
import { Link } from 'react-router-dom'

function Login({attemptLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    function handleLogin(e) {
        e.preventDefault()
        attemptLogin({username, password})
    }

    return (
        <div className = 'loginForms'>
            <div id = 'login'>
                <h2>Login to your account</h2>
                <form onSubmit = {handleLogin}>
                    <div id = 'username'>
                        <p>Username:</p>
                    <input
                        className = 'loginInput'
                        type = 'text'
                        onChange = {handleUsername}
                        value = {username}
                        placeholder = 'username'
                        required = 'required'
                    />
                    </div>
                    <div>
                    <p>Password: </p>
                    <input
                        className = 'loginInput'                    
                        type = 'password'
                        onChange = {handlePassword}
                        value = {password}
                        placeholder = 'password'
                        required = 'required'
                    />
                    </div>
                    <input
                        className = 'loginButton'
                        type = 'submit'
                        value = 'LOGIN' 
                    />
                    <p>Don't have an account? <Link to = '/signup'>Signup</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login