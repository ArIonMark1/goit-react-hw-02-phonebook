import React from 'react';
import './ContactList.scss';

export default class ContactsBook extends React.Component {
  render() {
    const { contacts, onDelete } = this.props;

    return (
      <div>
        <div className="contactsContainer">
          <h2>Contacts</h2>
          <ul className="contactsList">
            {contacts &&
              contacts.map(contact => (
                <li key={contact.id}>
                  Name:
                  <span className="content"> {contact.name}</span>
                  Phone:
                  <span className="content"> {contact.number}</span>
                  <button
                    className="conformButton"
                    type="button"
                    onClick={() => onDelete(contact.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
