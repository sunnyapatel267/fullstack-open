const PersonForm = 
  ({  
    addNewPerson,
    newName,handlePersonChange, 
    newNumber,handleNumberChange
  }) => {
  return (
    <div>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm