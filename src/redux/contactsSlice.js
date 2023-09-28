import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts, removeContact } from './operations';

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    clearAll: state => (state.contacts = []),
  },
  extraReducers: {
    [fetchContacts.pending](state, action) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending](state, action) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
    },
    [removeContact.pending](state, action) {
      state.isLoading = true;
      state.error = null;
    },
    [removeContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearAll } = slice.actions;
export const contactReducer = slice.reducer;
