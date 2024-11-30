import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
export interface User {
  name: string;
  email: string;
}

const initialState = {
  name: "omg",
  email: "",
};

// Define the userSlice with proper types using createSlice
const userSlice = createSlice({
  name: "user", // Slice name
  initialState,
  reducers: {
    // Action to update the user state
    updateUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
});

// Action creators are automatically generated for each reducer function
export const { updateUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
