import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import listingReducer from './listingSlice';
import authReducer from './authSlice';
import soldListingReducer from './soldListingSlice';
import reviewReducer from './reviewSlice';
import blogReducer from './blogSlice';

const rootReducer = combineReducers({
  user: userReducer,
  listing: listingReducer,
  soldListing: soldListingReducer,
  auth: authReducer,
  reviews: reviewReducer,
  blog: blogReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  store.__persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper(makeStore);
