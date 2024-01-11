import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Header from './components/Header'
import Filter from './components/Filter'

import phoneService from './services/phone'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesOrUnsucess,setSuccesOrUnsucess] = useState(false)

  useEffect(() => {
    phoneService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(persons.some(item => item.name === newPerson.name)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const arr = persons.filter(person => person.name === newName)
        const idNum = arr[0].id
        phoneService
          .update(idNum,newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== idNum ? person : returnedPerson))
            setNewName('')
            setNewNumber('')

            setSuccesOrUnsucess(true)

            setErrorMessage(`${newName}'s number was changed`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setSuccesOrUnsucess(false)
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== idNum))
          })
      }else{
        setNewName('')
        setNewNumber('')
      }
    }else{
      phoneService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccesOrUnsucess(true)
          setErrorMessage(`Added ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (name,id) => {
    if(window.confirm(`Delete ${name} ?`)){
      phoneService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterInput(event.target.value)
  }

  const filteredList = filterInput.trim() !== ''
    ? persons.filter(person => person.name.toLowerCase().includes(filterInput.toLowerCase()))
    : persons

  return (
    <div>
      
      <Header header="Phonebook"/>
      <Notification message={errorMessage} logic={succesOrUnsucess}/>
      <Filter filterInput={filterInput} handleFilterChange={handleFilterChange}/>

      <Header header="add a new"/>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName} handlePersonChange={handlePersonChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <Header header="Numbers"/>
      <Persons filteredList={filteredList} deletePerson={deletePerson}/>
      
    </div>
  )
}

export default App