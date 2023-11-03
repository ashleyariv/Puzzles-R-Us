
function History ({expenses, setExpenses, expenseDetails, setExpenseDetails, paidExpenses}) {
    return (
        <div>
            {/* {expenses.map(expense => (
                    <Link to = {`/${user.username}/expenses/${expense.id}`} key = {expense.id}>
                        <h3>{expense.company_name}</h3>
                    </Link>
                ))} */}
            {setExpenses(paidExpenses)}
        </div>
    )
}

export default History