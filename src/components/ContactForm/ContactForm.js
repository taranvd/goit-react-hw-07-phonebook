import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledField,
  StyledButton,
  Error,
} from './ContactForm.style';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

const scheme = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required!'),

  //* Для ментора: Тут я не знаю як додати валідацію для 654-42-42 такого вводу, тому залишив так
  number: Yup.number().required('Required!'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const addContactHandler = newContact => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${newContact.name} вже є у списку контактів!`);
      return false;
    }

    dispatch(addContact(newContact));
    return true;
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={scheme}
        onSubmit={async (values, actions) => {
          const addedContactSuccessfuly = addContactHandler(values);
          if (addedContactSuccessfuly) {
            actions.resetForm();
          }
        }}
      >
        <StyledForm>
          <label>
            Name
            <StyledField name="name" placeholder="Name" />
            <Error name="name" component="span" />
          </label>

          <label>
            Number
            <StyledField type="number" name="number" placeholder="Number" />
            <Error name="number" component="span" />
          </label>

          <StyledButton type="submit">Add contact</StyledButton>
        </StyledForm>
      </Formik>
    </>
  );
};
