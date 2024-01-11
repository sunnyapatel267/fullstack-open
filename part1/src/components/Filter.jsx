const Filter = ({filterInput, handleFilterChange}) => {
    return (
      <div>  
        filter shown with <input value={filterInput} onChange={handleFilterChange}/>
      </div>
    )
}

export default Filter