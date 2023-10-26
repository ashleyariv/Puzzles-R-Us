import {useState} from 'react'

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
            <form onSubmit = {handleSignup} >
            <input
                    type = 'text'
                    onChange = {handleEmail}
                    value = {email}
                    placeholder = 'email'
                />
                <input
                    type = 'text'
                    onChange = {handleUsername}
                    value = {username}
                    placeholder = 'username'
                />
                <input
                    type = 'text'
                    onChange = {handlePassword}
                    value = {password}
                    placeholder = 'password'
                />
                <input
                    type = 'submit'
                    value = 'Register' 
                />
            </form>
        </div>
    )
}

export default Register