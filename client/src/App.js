import React, { useState, useEffect} from 'react'
import { Switch, Route, useHistory } from "react-router-dom";
import Login from './Login' 
import Home from './Home'
import ExpenseCard from './ExpenseCard';
import NavBar from './NavBar';
import Profile from './Profile';
import History from './History'
import Header from './Header';
import Register from './Register';
import HistoryCard from './HistoryCard';

function App() {

  const [user, setUser] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [paidExpenses, setPaidExpenses] = useState([])
  const [expenseDetails, setExpenseDetails] = useState({})
  const [searchInput, setSearchInput] = useState('')
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
        .then(data => {setExpenses(data.filter(expense => {
          return (expense.paid === false)
        }).sort().reverse())})
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

  const filteredExpenses = expenses.filter(expense => {
    return (
      expense.company_name.toLowerCase().includes(searchInput.toLowerCase()) 
  )})

  const filteredPaidExpenses = paidExpenses.filter(paidExpense => {
    return (
      paidExpense.company_name.toLowerCase().includes(searchInput.toLowerCase()) 
  )})

  function updateExpenses(id) {
    const updatedExpenses = expenses.filter(ex => parseInt(ex.id) !== parseInt(id))
    setExpenses(updatedExpenses)
  }

  function updatePaidExpenses(id) {
    const updatePaidExpenses = paidExpenses.filter(ex => parseInt(ex.id) !== parseInt(id))
    setPaidExpenses(updatePaidExpenses)
  }

  return (
    <div id = 'app'>
      <Header />
      {user && <NavBar user = {user} logout = {logout} />}
      <Switch>
        <Route exact path = '/'>
          <Login attemptLogin = {attemptLogin} attemptSignup = {attemptSignup} />
        </Route>
        <Route path = '/signup'>
          <Register attemptSignup = {attemptSignup}/>
        </Route>
        <Route path = '/home'>
          {user ? (<Home user = {user} expenses = {filteredExpenses} addExpense = {addExpense} searchInput = {searchInput} setSearchInput = {setSearchInput} />) : null}
        </Route>
        <Route path = '/:username/history/:id'>
          <HistoryCard updateExpenses = {updateExpenses} updatePaidExpenses = {updatePaidExpenses} expenseDetails = {expenseDetails} setExpenseDetails = {setExpenseDetails} />
        </Route>
        <Route path = '/:username/history'>
          <History user = {user} paidExpenses = {filteredPaidExpenses} setPaidExpenses = {setPaidExpenses} expenseDetails = {expenseDetails} setExpenseDetails = {setExpenseDetails} searchInput={searchInput} setSearchInput={setSearchInput} />
        </Route>
        <Route path = '/:username/expenses/:id'>
          <ExpenseCard user = {user} updateExpenses = {updateExpenses} expenseDetails = {expenseDetails} setExpenseDetails = {setExpenseDetails} />
        </Route>
        <Route path = '/:username'>
          <Profile user = {user} setUser = {setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
