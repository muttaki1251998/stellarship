import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchListings = createAsyncThunk('listings/fetchListings', async () => {
  const response = await axios.get(`${process.env.NEXT_BACKEND_API_URL}/listings`, {
    headers: {
      'x-frontend-id': 'orionship',
    }
  });
  return response.data;
});

const listingsSlice = createSlice({
  name: 'listings',
  initialState: [],
  reducers: {
    setListings: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListings.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setListings } = listingsSlice.actions;
export default listingsSlice.reducer;
