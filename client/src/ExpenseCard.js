import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ExpenseCard({user, updateExpenses, expenseDetails, setExpenseDetails }) {

    const [paid, setPaid] = useState(false)
    const { id, username } = useParams()

    useEffect(() => {
        fetch(`/${username}/expenses/${id}`)
        .then(response => {
            if(response.ok) {
                response.json()
                .then(data => setExpenseDetails(data))
            } else {
                setExpenseDetails({})
            }
        })
      }, [user])

    function patchPaid(id,paid) {
        fetch(`/${user.username}/expenses/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify({"paid":paid})
        })
        .then(response => response.json())
        .then(data => {setExpenseDetails(data);setPaid(data['paid'])})
    }

    function deleteExpense(id) {
        fetch(`/${user.username}/expenses/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok) {
                updateExpenses(id)
               
            } else {
                alert('Something went wrong. Try again.')
            }
        })
    }

    return (
        <div>
            <h2>{expenseDetails.company_name}: ${expenseDetails.amount}  
                <button 
                onClick = {() => {setPaid(!paid); patchPaid(id,!paid)}}
                > {paid ? 'paid' : 'unpaid'} </button>
            </h2>
            <h3>{expenseDetails.date}</h3>
            <p>{expenseDetails.description}</p>
            <button onClick = {() => {deleteExpense(`${id}`)}}>Delete Expense</button>
        </div>
    )
}

export default ExpenseCard