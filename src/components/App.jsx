import { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
import styles from './App.module.css';

import { Form } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
    }
  }, []);

  const addContact = newContact => {
    const isExists = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExists) {
      return alert(`${isExists.name} is already in contacts.`);
    }
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const deleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const getContacts = (contacts, filter) => {
    const normalizeName = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeName)
    );
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getContacts(contacts, filter)}
        onDelete={deleteContact}
      />
    </div>
  );
};
