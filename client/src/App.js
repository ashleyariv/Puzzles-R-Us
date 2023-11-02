import React, { useState, useEffect} from 'react'
import { Switch, Route, useHistory} from "react-router-dom";
import Login from './Login' 
import Home from './Home'
import ExpenseCard from './ExpenseCard';
import NavBar from './NavBar';
import Profile from './Profile';

function App() {

  const [user, setUser] = useState(null)
  const [expenses, setExpenses] = useState([])
  let history = useHistory()

  useEffect(() => {
    fetch('/check_login')
    .then(response => {
      if (response.ok) {
        response.json()
        .then(data => setUser(data))
      }
    })
  }, [])

  useEffect(() => {
    user &&
    fetch(`/${user.username}/home`)
    .then(response => {
      if (response.ok) {
        response.json()
        .then(data => setExpenses([...data].sort().reverse()))
      } else{
        setExpenses([])
      }
    })
  }, [user])

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
        history.push('/home')
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
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        history.push('/home')
      });
  }

  function logout() {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(response => {if (response.ok) {
      setUser(null)
      history.push('/')
    }})
  }

  function addExpense(newExpense) {
    fetch(`/${user.username}/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newExpense)
    })
    .then(response => response.json())
    .then(data => setExpenses([data, ...expenses]))
  }

  function updateExpenses(id) {
    const updatedExpenses = expenses.filter(ex => parseInt(ex.id) !== parseInt(id))
    setExpenses(updatedExpenses)
    history.push('/home')
  }

  return (
    <div className="App">
      {user && <NavBar user = {user} logout = {logout} />}
      <Switch>
        <Route exact path = '/'>
          <Login attemptLogin = {attemptLogin} attemptSignup = {attemptSignup} />
        </Route>
        <Route path = '/home'>
          {user ? (<Home user = {user} logout = {logout} expenses = {expenses} addExpense = {addExpense} />) : null}
        </Route>
        <Route path = '/:username/expenses/:id'>
          <ExpenseCard user = {user} expenses = {expenses} setExpenses = {setExpenses} updateExpenses = {updateExpenses}/>
        </Route>
        <Route path = '/:username'>
          <Profile user = {user} setUser = {setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
