import { Component } from 'react';
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

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = evt => {
    evt.preventDefault();
    const contacts = this.state.contacts;
    const form = evt.currentTarget;
    const nameValue = form.elements.name.value;
    const numberValue = form.elements.number.value;
    const currentSubmit = {
      name: nameValue,
      number: numberValue,
      id: nanoid(),
    };
    if (this.checkOriginalNames(contacts, nameValue)) {
      Notify.failure(`❌ ${nameValue} is already in contacts list`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, currentSubmit],
      }));
    }
    form.reset();
  };

  onFilterChange = evt => {
    const filterValue = evt.currentTarget.value.toLowerCase();
    this.setState({ filter: filterValue.trim() });
  };

  checkOriginalNames = (contacts, contact) => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === contact.toLowerCase()
    );
  };
  deleteContact = evt => {
    const contacts = this.state.contacts;
    const contactId = evt.currentTarget.id;
    const newArr = contacts.filter(({ id }) => id !== contactId);
    this.setState({ contacts: newArr });
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    console.log();
    const localContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={css.container}>
        <Section title="Phonebook">
          <AddContacts addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length !== 0 && (
            <>
              <FilterContacts
                changeFilter={this.onFilterChange}
                value={filter}
              />
              <MapContacts
                filterContacts={this.filterContacts}
                deleteContact={this.deleteContact}
              />
            </>
          )}
        </Section>
      </div>
    );
  }
}
