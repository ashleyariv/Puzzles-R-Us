import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

function ExpenseCard({user, expenses, updateExpenses, expenseDetails, setExpenseDetails}) {

    const [paid, setPaid] = useState(false)
    const { id, username } = useParams()
    let history = useHistory()

    useEffect(() => {
        fetch(`/${username}/expenses/${id}`)
        .then(response => {
            if(response.ok) {
                response.json()
                .then(data => {setExpenseDetails(data); setPaid(data['paid'])})
            } else {
                setExpenseDetails({})
            }
        })
      }, [user])

    function patchPaid(id, paid) {
        fetch(`/${username}/expenses/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify({'paid': paid})
        })
        .then(response => response.json())
        .then(data => {
            setExpenseDetails(data); 
            setPaid(data['paid'])
            updateExpenses(id)
            history.push('/home')
        })   
    }

    function deleteExpense(id) {
        fetch(`/${username}/expenses/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok) {
                updateExpenses(id)
                history.push('/home')               
            } else {
                alert('Something went wrong. Try again.')
            }
        })
    }

    return (
        <div>
            <div className = 'expenseDetails'>
            <h2>This expense was made for {expenseDetails.company_name}</h2>
            <h3>The total amount is ${expenseDetails.amount}</h3>
            <h3>Date of Expense: {expenseDetails.date}</h3>
            <h3>Reason for Expense:</h3>
            <p>{expenseDetails.description}</p>
            <button className = 'loginButton' onClick = {() => {deleteExpense(`${id}`)}}>Delete Expense</button>
            </div>
            <button className = 'unpaidButton' onClick = {() => {patchPaid(id, !paid)}}> 
                {paid ? 'PAID' : 'UNPAID'} 
            </button>
        </div>
    )
}

export default ExpenseCard