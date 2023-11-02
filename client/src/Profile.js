import { useEffect, useState } from 'react'
import { useParams, useHistory} from 'react-router-dom'

function Profile({user}) {

    const [profile, setProfile] = useState({})
    const { username } = useParams()
    const history = useHistory()

    useEffect(() => {
        fetch(`/${username}`)
        .then(response => {
            if(response.ok) {
                response.json()
                .then(data => setProfile(data))
            } else {
                setProfile({})
            }
        })
    }, [user])

    function deleteProfile(username) {
        fetch(`/${username}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok) {
                setProfile({})
            } else {
                alert('Something went wrong. Please try again.')
            }
        })
    }

    return (
        <div>
            <h1>User Profile Details</h1>
            <h3>Username: {profile.username}</h3>
            <h4>Email: {profile.email}</h4>
            <h4>Password: {profile.password}</h4>
            <button onClick = {() => {deleteProfile(`${username}`); history.push('/')}}>Delete Account</button>
        </div>
    )
}

export default Profile