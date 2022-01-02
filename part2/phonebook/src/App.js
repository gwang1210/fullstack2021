import React, { useState,useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Persons = ({persons,doDelete}) => {
  return (
    <>
      {persons.map(person =>
        <Person key={person.id} person={person} doDelete={doDelete}/>
      )}
    </>
  )
}
const Person = ({person, doDelete}) => {
  return <li>{person.name} {person.number} <DeleteButton person={person} doDelete={doDelete}/></li>
}
const DeleteButton = ({person, doDelete}) => {
  const handleDelete = (event) => {
    event.preventDefault()
    if(window.confirm(`Do you really want to delete entry delete ${person.name}?`)){
      console.log(event.target)
      doDelete(person);
      //axios call here
      // personService.deletePerson(person.id).then(response => {
      //   setPersons(persons.filter(onePerson => onePerson != person))
      // })
    }
  }
  return <button onClick={handleDelete}>Delete</button>
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)
  const [message, setMessage] = useState(null)
  const addName = (event) => {
    event.preventDefault()
    if(!newName || !newNumber) {
      window.alert('Please enter a valid name and/or number')
    }
    else if (persons.map(person => person.name).includes(newName.trim())) {
      window.alert(`${newName} already exists`)
    }
    else {
      const newPerson = {name: newName, number: newNumber, id: newName}
    //   axios
    //   .post('http://localhost:3001/persons', newPerson)
    //   .then(response => {
    //     setPersons(persons.concat(newPerson))
    //     setNewName('')
    //     setNewNumber('')
    //  })
     personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(
        `'${returnedPerson.name}' was added to server`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
     })
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
  const doDelete = (person) => {
    personService.deletePerson(person.id).then(response => {
      setPersons(persons.filter(onePerson => onePerson != person))
    })
  }
  useEffect(() => {
    console.log('effect')
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
    personService.getAll().then(initalPersons => {
      setPersons(initalPersons)
    })
  }, [])

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      search by name: <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={personsToShow} doDelete={doDelete}/>
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}
export default App