import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    logo: '',
    tagline: '',
    openingHeader: '',
    openingDescription: '',
    profileBio: '',
    profilePicture: '',
    profileDescription: '',
    address: '',
    email: '',
    phone: '',
    intro: '',
    role: '',
    contactMePicture: '',
    city: '',
    country: ''
  },
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
