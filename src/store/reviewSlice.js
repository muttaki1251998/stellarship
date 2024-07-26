import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an axios instance with the common header
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BACKEND_API_URL,
  headers: {
    'x-frontend-id': 'orionship',
  },
});

// Thunks
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('quote', reviewData.quote);
      formData.append('name', reviewData.name);
      formData.append('role', reviewData.role);
      formData.append('featureWithStars', reviewData.featureWithStars);
      if (reviewData.picture) {
        formData.append('picture', reviewData.picture);
      }

      const response = await axiosInstance.post('/create-review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllReviews = createAsyncThunk(
  'reviews/getAllReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/reviews');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeaturedStarCount = createAsyncThunk(
  'reviews/getFeaturedStarCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/star-count');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/review/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleFeatureWithStars = createAsyncThunk(
  'reviews/toggleFeatureWithStars',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/review/${id}/toggle-feature`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    starCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Reviews
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Featured Star Count
      .addCase(getFeaturedStarCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedStarCount.fulfilled, (state, action) => {
        state.loading = false;
        state.starCount = action.payload.count; // Update starCount with the response data
      })
      .addCase(getFeaturedStarCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.meta.arg
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Feature with Stars
      .addCase(toggleFeatureWithStars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFeatureWithStars.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex(review => review._id === action.payload._id);
        if (index !== -1) {
          state.reviews[index].featureWithStars = action.payload.featureWithStars;
        }
      })
      .addCase(toggleFeatureWithStars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
