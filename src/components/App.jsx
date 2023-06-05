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
    // contacts: [], // {id: 'id-1' name: 'John', number: '123'}
  };

  receiveFormData = data => {
    // console.log('Showed data from App: ', data);

    this.setState(({ contacts }) => {
      if (contacts.find(contact => contact.name === data.name)) {
        alert(`${data.name} is already in contacts.`);
      } else {
        return { contacts: [...contacts, data] };
      }
    });
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
    console.log('Received ID: ', id);
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    console.log('Control state: ', this.state); // перевірка що пише фільтр у стейт

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

/*
  Напиши застосунок зберігання контактів телефонної книги.

  Крок 1
  Застосунок повинен складатися з форми і списку контактів. На поточному кроці реалізуй додавання імені контакту та відображення списку контактів.
   Застосунок не повинен зберігати контакти між різними сесіями (оновлення сторінки).

  Використовуйте цю розмітку інпуту з вбудованою валідацією для імені контакту.

  <input
    type="text"
    name="name"
    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    required
  />

  Стан, що зберігається в батьківському компоненті <App>, обов'язково повинен бути наступного вигляду, додавати нові властивості не можна.

  state = {
    contacts: [],
    name: ''
  }

  Кожен контакт повинен бути об'єктом з властивостями name та id. Для генерації ідентифікаторів використовуй будь-який відповідний пакет, 
  наприклад nanoid. Після завершення цього кроку, застосунок повинен виглядати приблизно так.

*/
