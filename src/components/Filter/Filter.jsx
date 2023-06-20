import PropTypes from 'prop-types';
import styles from './Filter.module.css';

export const Filter = ({ value, onChange }) => (
  <label className={styles.filter_info}>
    Find contacts by name:
    <input name="filter" value={value} onChange={onChange}></input>
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
