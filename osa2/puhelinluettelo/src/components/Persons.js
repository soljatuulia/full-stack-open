const Persons = ({ personsToShow, deletePerson}) => {
    return (
      <ul>
        {personsToShow.map(person => 
          <li key={person.name}>
          {person.name} {person.number}
          <button type="delete" onClick={() => deletePerson(person)}>delete</button>
          </li>)}
      </ul>
    )
};

export default Persons;