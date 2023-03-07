import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled');
        setPersons(initialPersons);
      })
  }, []);

  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    };

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook. Update phone number?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber}

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setMessage(`${newName}'s number was updated!`)
            setMessageType('success')
            setTimeout(() => {
              setMessage(null)
            }, 5000)})
          .catch(error => {
            setMessage(`${newName} was already deleted from server`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          }) 
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`${newName} was added to the phonebook!`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setMessage(error.response.data.error)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    
    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
      .remove(person.id)
      .then
        (setPersons(persons.filter((p) => p.id !== person.id)))
        setMessage(`${person.name} was deleted!`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} type={messageType}/>
        <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
        <PersonForm addPerson={addPerson}
          newName={newName} newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} 
        deletePerson={deletePerson}/>
    </div>
  )
};

export default App;