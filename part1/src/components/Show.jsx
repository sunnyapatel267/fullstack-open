const Show = ({person,deletePerson}) => { 
    return (
      <div>
        <p>{person.name} {person.number} <button onClick={() => deletePerson(person.name,person.id)} >delete</button></p> 
      </div>
    )
}

export default Show