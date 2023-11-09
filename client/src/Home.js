import {Link} from 'react-router-dom'
import { useState } from 'react'
import Search from './Search'

function Home({user, expenses, addExpense, searchInput, setSearchInput}) {

    const defaultForm = {
        date: '', 
        amount:'',
        company_name: '',
        category:'',
        description: '',
        category_id: expenses.category,
        user_id: user.id
    }

    function reset () {
        const dropDown = document.getElementById('select')
        dropDown.selectedIndex = 'select one'
    }

    const [form, setForm] = useState(defaultForm)
    const [date, setDate] = useState('')

    const handleSubmit = e => {
        const newObj = {
            date: date, 
            amount: form.amount,
            company_name: form.company_name,
            category: form.category,
            description: form.description,
            category_id: expenses.category,
            user_id: user.id,
        }
        e.preventDefault()
        addExpense(newObj)
        setForm(defaultForm)
        setDate('')
        reset()
    }

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onDateChange = e => {
        setDate(e.target.value);
     }

    return (
        <div>
            <div id = 'expenseForm'>
                <h2>New Expense</h2>
                <form className = 'expenseInputs' onSubmit = {handleSubmit} style = {{border: 'none'}}>
                    <input
                        className = 'expenseInputs'
                        type = 'date'
                        value = {date}
                        onChange = {onDateChange}
                        required = 'required'
                    />
                    <input 
                        className = 'expenseInputs'
                        name = 'amount' 
                        placeholder = 'Amount' 
                        onChange = {handleChange}
                        value = {form.amount}
                        required = 'required'
                    />
                    <input 
                        className = 'expenseInputs'
                        name = 'company_name'
                        placeholder = 'Company Name'
                        onChange = {handleChange}
                        value = {form.company_name}
                        required = 'required'
                    />
                    <select
                        className = 'expenseInputs'
                        id = 'select'
                        name ='category'
                        onChange = {handleChange}
                        defaultValue = {'select one'} 
                    >
                        <option value = 'select one' disabled>Select one</option>
                        <option value = 'Food'>Food</option>
                        <option value = 'Transportation/Travel'>Transportation/Travel</option>
                        <option value = 'Supplies'>Supplies</option>
                        <option value = 'Advertising'>Advertising</option>
                        <option value = 'Rentals'>Rentals</option>
                        <option value = 'Permits'>Permits</option>
                        <option value = 'Medical'>Medical</option>
                        <option value = 'Misc'>Misc</option>
                    </select>
                    <textarea
                        style = {{resize:"none"}}
                        className = 'expenseInputs'
                        name = 'description'
                        rows = '10' 
                        col = '20' 
                        warp = 'hard' 
                        maxLength = '300' 
                        placeholder = 'Description/Reason for expense' 
                        onChange = {handleChange} 
                        value = {form.description}
                        required = 'required'
                    ></textarea>
                    <button className = 'loginButton' type = 'submit'>Submit</button>
                </form>
            </div>
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
            <div className = 'expenseList'>
                <h2 className = 'expenseH2'>Unpaid Expenses</h2>
                    {expenses.map(expense => (
                        <Link to = {`/${user.username}/expenses/${expense.id}`} key = {expense.id} id = 'expenseLink'>
                            <h3 className = 'expenseH3'>{expense.company_name} ______________________________________ {expense.date}</h3>
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default Home