import { useParams, useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react'

function ExpenseCard({user}) {

    const [expenseDetails, setExpenseDetails] = useState({})
    const { id, username } = useParams()
    const history = useHistory()

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

    function deleteExpense(id) {
        fetch(`/${user.username}/expenses/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok) {
                setExpenseDetails({})
            } else {
                alert('Something went wrong. Try again.')
            }
        })
    }

    return (
        <div>
            <h2>{expenseDetails.company_name}: ${expenseDetails.amount}</h2>
            <h3>{expenseDetails.date}</h3>
            <p>{expenseDetails.description}</p>
            <button onClick = {() => {deleteExpense(`${id}`); history.push('/home')}}>Delete Expense</button>
        </div>
    )
}

export default ExpenseCard