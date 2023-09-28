import { getContacts, getFilter } from 'redux/selectors';
import {
  ButtonClearAll,
  ButtonStyled,
  List,
  ListItem,
} from './ContactsList.style';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/operations';

export const ContactsList = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <List>
      {visibleContacts.map(contact => (
        <ListItem key={contact.id}>
          <span style={{ textAlign: 'center' }}>{contact.name} </span>
          <span style={{ textAlign: 'center' }}>{contact.number}</span>
          <ButtonStyled onClick={() => dispatch(removeContact(contact.id))}>
            Delete
          </ButtonStyled>
        </ListItem>
      ))}
      <ButtonClearAll>Clear all</ButtonClearAll>
    </List>
  );
};
