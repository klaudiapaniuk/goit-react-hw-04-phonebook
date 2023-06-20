import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';

export const ContactListItem = ({ contact, onDelete }) => {
  const { id, name, number } = contact;
  return (
    <li className={styles.item_list}>
      {name}: {number}
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.objectOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
};
