import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

export const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const nameRef = useRef();
  const numberRef = useRef();

  const handleChange = () => {
    const inputName = nameRef.current.value;
    const inputNumber = numberRef.current.value;
    if (inputName !== name) {
      setName(inputName);
    }
    if (inputNumber !== number) {
      setNumber(inputNumber);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = { id: nanoid(), name, number };
    onSubmit(newContact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form_input} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        id={nameInputId}
        type="text"
        name="name"
        ref={nameRef}
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />
      <label htmlFor={numberInputId}>Number</label>
      <input
        id={numberInputId}
        type="tel"
        name="number"
        ref={numberRef}
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />
      <button>Add contact</button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
