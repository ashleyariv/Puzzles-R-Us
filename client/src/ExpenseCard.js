import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'

function ExpenseCard({user, expenses, setExpenses, updateExpenses}) {

    const [expenseDetails, setExpenseDetails] = useState({})
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

    function patchPaid(id) {
        fetch(`/${user.username}/expenses/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify({paid})
        })
        .then(response => response.json())
        .then(data => setPaid(data))
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
            <h2>{expenseDetails.company_name}: ${expenseDetails.amount} ... 
                <input 
                type = 'checkbox'
                checked = {paid}
                onChange = {(e) => {setPaid(e.target.checked); patchPaid(id)}}
                ></input>
            </h2>
            <h3>{expenseDetails.date}</h3>
            <p>{expenseDetails.description}</p>
            <button onClick = {() => {deleteExpense(`${id}`)}}>Delete Expense</button>
        </div>
    )
}

export default ExpenseCard