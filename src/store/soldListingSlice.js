import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSoldListings = createAsyncThunk('soldListings/fetchSoldListings', async () => {
  const response = await axios.get(`${process.env.NEXT_BACKEND_API_URL}/soldListings`, {
    headers: {
      'x-frontend-id': 'orionship',
    }
  });
  return response.data;
});

const soldListingsSlice = createSlice({
  name: 'soldListings',
  initialState: [],
  reducers: {
    setSoldListings: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSoldListings.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setSoldListings } = soldListingsSlice.actions;
export default soldListingsSlice.reducer;
