import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  filteredValue: [],
  loading: false,
};

const BASE_URL = 'http://localhost:3001/notes'

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (thunkAPI) => {
    const response = await fetch(BASE_URL, {
      method: "GET"
    });
    const data = await response.json();
    return data;
  }
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (note, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    }
    catch (err) {
      return rejectWithValue("There seems to be an error!");
    }
  }
)

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    filter: (state, { payload }) => {
      if (payload === '') {
        state.filteredValue = state.value;
      }
      else {
        state.filteredValue = state.value.filter(val => val.title.startsWith(payload));
      }
    }
  },
  extraReducers: {
    [fetchNotes.pending]: (state) => {
      state.loading = true;
    },
    [fetchNotes.rejected]: (state) => {
      state.loading = false;
    },
    [fetchNotes.fulfilled]: (state, { payload }) => {
      state.value = payload;
      state.filteredValue = payload;
      state.loading = false;
    },
    [createNote.rejected]: (state, { payload }) => {
      console.log(payload);
    },
    [createNote.fulfilled]: (state, { payload }) => {
      state.value = [...state.value, payload];
      state.filteredValue = state.value;
    }
  }
});

export const { filter } = notesSlice.actions;

export default notesSlice.reducer;