import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'


const CocktailList = () => {
    const [loading, setLoading] = useState(true)
    const [cocktails, setCocktails] = useState([])
    const [text, setText] = useState('')

    const getCocktails = async () => {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        setCocktails(response.data.drinks);
        setLoading(false)
     }

    useEffect(() => {            
        getCocktails()
     }, [])

    const handleText = (e) => {
        setText(e.target.value);
    }

    const filteredData = cocktails.filter((row) =>
        row.strDrink.toLowerCase().includes(text.toLowerCase())
    )

    const columns = [
        { field: 'idDrink', headerName: 'ID', width: 90 },
        { name: 'Image', selector: 'strDrinkThumb', cell: row => <img src={row.strDrinkThumb} alt={row.strDrink} width='50' height='50' /> },        
        { name: 'Name', selector: 'strDrink', sortable: true },
        { name: 'Category', selector: 'strCategory', sortable: true },
        { name: 'Alcoholic', selector: 'strAlcoholic', sortable: true },
        { name: 'Instructions', selector: 'strInstructions', sortable: true },  
    ]
    return (
        <div className='table-container'>
            <h1>Cocktail List</h1>
            <div className='inputText'>
                <input className='search-input'
                    type="text"
                    placeholder='Search cocktails'
                    value={text}
                    onChange={handleText}/>
            </div>
            
            {loading ? (<p>Loading...</p>) : (
            <DataTable className='table'
                columns={columns}
                data={filteredData}
                pagination
                paginationPerPage = {5}                
                paginationRowsPerPageOptions={[5, 10, 20]}
                paginationDefaultPage={5}
                defaultSortField='strDrink'
                defaultSortAsc={true}
                responsive
            />
          )}
        </div>
      )
}

export default CocktailList