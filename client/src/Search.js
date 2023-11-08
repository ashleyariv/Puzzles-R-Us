import React from 'react'

function Search({searchInput, setSearchInput}) {
    return (
        <div id='search'>
            <label htmlFor='search'></label>
            <input 
                style = {{textAlign: 'center'}}
                id='search-input'
                type='text'
                name='search'
                placeholder='Search Expense'
                value={searchInput} onChange={event => setSearchInput(event.target.value)}
            />
        </div>
    )
}

export default Search