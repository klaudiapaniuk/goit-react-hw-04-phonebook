import { ContactListItem } from '../ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={styles.contact_list}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
