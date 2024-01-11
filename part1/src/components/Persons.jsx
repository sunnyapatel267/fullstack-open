import Show from './Show'

const Persons = ({ filteredList, deletePerson }) => {
    return (
      <div>
        {filteredList.map(person =>
          <Show key={person.id} person={person} deletePerson={deletePerson} />
        )}
      </div>
    )
}

export default Persons