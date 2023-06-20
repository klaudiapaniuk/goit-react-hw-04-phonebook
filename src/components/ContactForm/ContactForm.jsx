import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  typeInputForm = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.addContact({
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    });
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form_input} onSubmit={this.submitForm}>
        <label htmlFor={this.nameInputId}>Name</label>
        <input
          id={this.nameInputId}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.typeInputForm}
        />
        <label htmlFor={this.numberInputId}>Number</label>
        <input
          id={this.numberInputId}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.typeInputForm}
        />
        <button>Add contact</button>
      </form>
    );
  }
}

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
};
