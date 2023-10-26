import React, { useState, useEffect} from 'react'
import { Switch, Route, useHistory} from "react-router-dom";
import Login from './Login' 

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/check_login')
    .then(response => {
      if (response.ok) {
        response.json()
        .then(data => setUser(data))
      }
    })
  }, [])

  function attemptLogin(userInfo) {
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      },
      body: JSON.stringify(userInfo)
    })
      .then((res)=>res.json())
      .then((data) => {
        setUser(data)
        // history.push('/posts')
      });
  }

  function attemptSignup(userInfo) {
    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      },
      body: JSON.stringify(userInfo)
    })
      .then((res)=>res.json())
      .then((data) => {
        setUser(data)
        // history.push('/posts')
      });
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path = '/'>
        <Login attemptLogin = {attemptLogin} attemptSignup = {attemptSignup} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
