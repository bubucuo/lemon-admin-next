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

// 标准的reducers写法，纯函数
// type Action = {
//   payload: any;
//   action: string;
// };
// const reducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case "user/updateUser":
//       return { ...state, ...action.payload };
//     case "user/init":
//       return { ...state, name: "omg" };
//     default:
//       return state;
//   }
// }

// Define the userSlice with proper types using createSlice
const userSlice = createSlice({
  name: "user", // Slice name
  initialState,
  // 和redux的reducer概念不一样，是因为rtk底层帮我们封装了reducer，用的是immer
  // store 修改规则
  reducers: {
    // Action to update the user state
    updateUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
    initUser: (state) => {
      state.name = "初始化";
      state.email = "";
    },
  },
});

// Action creators are automatically generated for each reducer function
export const { updateUser, initUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
