import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

import { Form } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const existingContact = this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );
    if (existingContact) {
      alert(`${normalizedName} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prev => ({
      contacts: [contact, ...prev.contacts],
    }));
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  typeInputContacts = e => {
    this.setState({ filter: e.target.value });
  };

  filter = () => {
    const normalizedText = this.state.filter.toLowerCase();
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedText)
    );
  };

  componentDidMount = () => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate = (_, prev) => {
    if (this.state.contacts !== prev.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    const { filter } = this.state;
    const { addContact, deleteContact, typeInputContacts } = this;
    const filteredContacts = this.filter();

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <Form addContact={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={typeInputContacts} />
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      </div>
    );
  }
}
