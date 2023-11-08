import { useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import Search from './Search'

function History ({paidExpenses, setPaidExpenses, user, searchInput, setSearchInput}) {

    const { username } = useParams()

    useEffect(() => {
        fetch (`/${username}/home`) 
        .then(response => {
            if(response.ok) {
                response.json()
                .then(data => {setPaidExpenses(data.filter(expense => {
                    return (expense.paid === true)
                }))})
            } else{
                setPaidExpenses([])
            }
        })
    }, [user])

    return (
        <div className = 'expenseList'>
            <Search searchInput = {searchInput} setSearchInput = {setSearchInput} />
                <h2 className = 'expenseH2'>Paid Expenses</h2>
                    {paidExpenses.map(expense => (
                        <Link to = {`/${username}/history/${expense.id}`} key = {expense.id} id = 'expenseLink'>
                            <h3 className = 'expenseH3'>{expense.company_name} ______________________________________ {expense.date}</h3>
                        </Link>
                    ))}
        </div>
    )
}

export default History