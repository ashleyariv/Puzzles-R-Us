import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

function HistoryCard({user, updatePaidExpenses, expenseDetails, setExpenseDetails}) {

    const [paid, setPaid] = useState(false)
    const { id, username } = useParams()
    let history = useHistory()

    useEffect(() => {
        fetch(`/${username}/history/${id}`)
        .then(response => {
            if(response.ok) {
                response.json()
                .then(data => {setExpenseDetails(data); setPaid(data['paid'])})
            } else {
                setExpenseDetails({})
            }
        })
      }, [])

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
        .then(data => {setExpenseDetails(data); setPaid(data['paid'])})
        updatePaidExpenses(id)
        history.push(`/${username}/history`)              
    }

    function deleteExpense(id) {
        fetch(`/${username}/expenses/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok) {
                updatePaidExpenses(id)
                history.push(`/${username}/history`)              
            } else {
                alert('Something went wrong. Try again.')
            }
        })
    }

    return (
        <div>
            <h2>{expenseDetails.company_name}: ${expenseDetails.amount}  
                <button 
                onClick = {() => {setPaid(!paid); patchPaid(id, !paid)}}
                > {paid ? 'paid' : 'unpaid'} </button>
            </h2>
            <h3>{expenseDetails.date}</h3>
            <p>{expenseDetails.description}</p>
            <button onClick = {() => {deleteExpense(`${id}`)}}>Delete Expense</button>
        </div>
    )
}

export default HistoryCard