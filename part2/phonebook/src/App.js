import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Persons = ({persons}) => {
  return (
    <>
      {persons.map(person =>
        <Person key={person.id}person={person}/>
      )}
    </>
  )
}
const Person = ({person}) => {
  return <li>{person.name} {person.number}</li>
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)
  const addName = (event) => {
    event.preventDefault()
    if(!newName || !newNumber) {
      window.alert('Please enter a valid name and/or number')
    }
    else if (persons.map(person => person.name).includes(newName.trim())) {
      window.alert(`${newName} already exists`)
    }
    else {
      setPersons(persons.concat({name: newName, id: persons.length+1, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    setIsFiltered(filter)
  } 
  const personsToShow = isFiltered ? 
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      search by name: <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={personsToShow}/>
      </ul>
    </div>
  )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
        <div>
          <h2>Add new entry</h2>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({filter, handleFilterChange}) => {
  return <input value={filter} onChange={handleFilterChange}/>
}

export default App