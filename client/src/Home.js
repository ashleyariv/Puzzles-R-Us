import {Link} from 'react-router-dom'
import { useState } from 'react'

function Home({user, expenses, logout, addExpense}) {

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
            <button onClick = {logout}>Logout</button>
            <h2>Your Expenses</h2>
            <form onSubmit = {handleSubmit}>
                <input
                    type = 'date'
                    value = {date}
                    onChange = {onDateChange}
                />
                <input 
                    name = 'amount' 
                    placeholder = 'Amount' 
                    onChange = {handleChange}
                    value = {form.amount}
                />
                <input 
                    name = 'company_name'
                    placeholder = 'Company Name'
                    onChange = {handleChange}
                    value = {form.company_name}
                />
                <select 
                    id = 'select'
                    name ='category'
                    onChange = {handleChange}
                    defaultValue = {'select one'} 
                >
                    <option value = 'select one' disabled>Select one</option>
                    <option value = 'food'>Food</option>
                    <option value = 'transportation'>Transportation</option>
                    <option value = 'East Erica'>East Erica</option>
                </select>
                <textarea
                    name = 'description'
                    rows = '10' 
                    col = '20' 
                    warp = 'hard' 
                    maxLength = '300' 
                    placeholder = 'Description/Reason for expense' 
                    onChange = {handleChange} 
                    value = {form.description}
                ></textarea>
                <button type = 'submit'>Submit</button>
            </form>
                {expenses.map(expense => (
                    <Link to = {`/${user.username}/expenses/${expense.id}`}>
                        <h3>{expense.company_name}</h3>
                    </Link>
                ))}
        </div>
    )
}

export default Home