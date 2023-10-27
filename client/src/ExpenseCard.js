import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ExpenseCard({user, expenses}) {

    const [expenseDetails, setExpenseDetails] = useState({})
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        fetch(`/${user.username}/expenses/${id}`)
        .then(response => {
            if(response.ok) {
                response.json()
                .then(data => setExpenseDetails(data))
            } else {
                setExpenseDetails({})
            }
        })
    }, [user])

    return (
        <div>
            <h2>{expenseDetails.company_name}</h2>
            <h3>{expenseDetails.date} || ${expenseDetails.amount}</h3>
            <p>{expenseDetails.description}</p>
        </div>
    )
}

export default ExpenseCard