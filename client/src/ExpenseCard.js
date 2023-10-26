import React from 'react'

function ExpenseCard({expense}) {
    return (
        <div>
            <h2>{expense.company_name}</h2>
            <h3>{expense.date} || ${expense.amount}</h3>
            <p>{expense.description}</p>
        </div>
    )
}

export default ExpenseCard