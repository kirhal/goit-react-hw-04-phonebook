import PropTypes from 'prop-types';
import css from './Filter.module.css';

export default function FilterContacts({ changeFilter, value }) {
  return (
    <div className={css.filter}>
      <input
        value={value}
        onChange={changeFilter}
        type="text"
        name="filter"
        className={css['filter-input']}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        placeholder="Find contacts by name"
      />
    </div>
  );
}

FilterContacts.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  value: PropTypes.string,
};
