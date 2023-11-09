import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

function Profile({ user, setUser }) {

    const [profile, setProfile] = useState({})
    const [showPopup, setShowPopup] = useState(false);
    const { username } = useParams()
    const history = useHistory()

    const defaultForm = {
        email: '',
        username: '',
        password: ''
    }

    const [form, setForm] = useState(defaultForm)
    function togglePopup() {
        setShowPopup(!showPopup);
    };

    function handleInputChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    };


    useEffect(() => {
        fetch(`/${username}`)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            setProfile(data)
                            setForm({
                                email: data.email,
                                username: data.username,
                                password: ''
                            })
                        })
                } else {
                    setProfile({})
                }
            })
    }, [user])

    function updateProfile() {
        fetch(`/${username}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ form })
        })
            .then(response => response.json())
            .then(data => {setForm(data); setProfile(data) })
        togglePopup();
    };

    function deleteProfile(username) {
        fetch(`/${username}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setUser(null)
                    history.push('/')
                } else {
                    alert('Something went wrong. Please try again.')
                }
            })
    }

    return (
        <div>
            <div className = 'expenseDetails'>
            <h1>User Profile Details</h1>
            <h3>Username: {profile.username}</h3>
            <h4>Email: {profile.email}</h4>
            <h4 id='password'>Password: </h4>
            <button className = 'loginButton' onClick={togglePopup}>Edit Profile</button>
            {showPopup && (
                <div className="popup">
                    <form>
                        <p>Email: <input
                            className = 'formInput'
                            type='text'
                            name='email'
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder='email'
                        />
                        </p>
                        <p>Username: <input
                            className = 'formInput'
                            type='text'
                            name='username'
                            value={form.username}
                            onChange={handleInputChange}
                            placeholder='username'
                        />
                        </p>
                        <p>Password: <input
                            className = 'formInput'
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleInputChange}
                            placeholder='password'
                        />
                        </p>
                        <button className = 'loginButton' type='button' onClick={updateProfile}>UPDATE</button>
                    </form>
                </div>
            )}
            </div>
            <button id = 'deleteButton' onClick={() => deleteProfile(`${username}`)}>DELETE ACCOUNT</button>
        </div>
    )
}

export default Profile