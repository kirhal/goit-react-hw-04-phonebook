import PropTypes from 'prop-types';
import css from './Contacts.module.css';

export default function MapContacts({ filterContacts, deleteContact }) {
  return (
    <ul className={css['contacts-list']}>
      {filterContacts().map(({ id, name, number }) => {
        return (
          <li key={id} className={css['contacts-list__item']}>
            <span className={css['contacts-list__data']}>
              {name}: {number}
              <button
                type="button"
                className={css['contacts-list__button']}
                id={id}
                onClick={deleteContact}
              >
                Delete
              </button>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

MapContacts.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
