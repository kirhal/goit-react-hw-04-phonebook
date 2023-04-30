import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

import Section from './section/Section';
import AddContacts from './phonebook/AddContacts';
import MapContacts from './contacts/RenderContacts';
import FilterContacts from './filter/FilterContacts';

Notify.init({
  fontSize: '20px',
  width: '400px',
  position: 'top-center',
  cssAnimationDuration: 500,
  cssAnimationStyle: 'zoom',
});

export default function App() {
  const localContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(localContacts);

  const [contacts, setContacts] = useState(
    parsedContacts ? parsedContacts : []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const nameValue = form.elements.name.value;
    const numberValue = form.elements.number.value;
    const currentSubmit = {
      name: nameValue,
      number: numberValue,
      id: nanoid(),
    };
    if (checkOriginalNames(contacts, nameValue)) {
      Notify.failure(`❌ ${nameValue} is already in contacts list`);
    } else {
      setContacts(prevState => [...prevState, currentSubmit]);
    }
    form.reset();
  };

  const onFilterChange = evt => {
    const filterValue = evt.currentTarget.value.toLowerCase().trim();
    setFilter(filterValue);
  };

  const checkOriginalNames = (contacts, contact) => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === contact.toLowerCase()
    );
  };

  const deleteContact = evt => {
    const contactId = evt.currentTarget.id;
    const newArr = contacts.filter(({ id }) => id !== contactId);
    setContacts(newArr);
  };

  const filterContacts = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  return (
    <div className={css.container}>
      <Section title="Phonebook">
        <AddContacts addContact={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length !== 0 && (
          <>
            <FilterContacts changeFilter={onFilterChange} value={filter} />
            <MapContacts
              filterContacts={filterContacts}
              deleteContact={deleteContact}
            />
          </>
        )}
      </Section>
    </div>
  );
}
