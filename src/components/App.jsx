import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchContacts from './SearchContacts/SearchContacts';
import debounce from 'lodash.debounce';

const DATA_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};
export default class App extends React.Component {
  state = {
    ...DATA_STATE,
  };

  receiveFormData = data => {
    const { contacts } = this.state;

    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    this.setState({ contacts: [...contacts, data] });
  };

  filterInputData = debounce(data => {
    this.setState({ filter: data.toLowerCase() });
  }, 400);

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    const filteredContactArr = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return filteredContactArr; // повертає новий масив
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className="container">
        <h2>Phone Book</h2>
        <ContactForm onSubmit={this.receiveFormData} />
        {this.state.contacts.length !== 0 && (
          <>
            <SearchContacts onChange={this.filterInputData} /> {/*// готово */}
            <ContactList
              contacts={this.filteredContacts()}
              onDelete={this.deleteContact}
            />
          </>
        )}
      </div>
    );
  }
}
