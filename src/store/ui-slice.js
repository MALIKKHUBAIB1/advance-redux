import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartVisible: false, notification: null };
const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.cartVisible = !state.cartVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification(state, action) {
      state.notification = null;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// const uiSlice = createSlice({
//   name: "ui",
//   initialState: { cartisVisible: false },
//   reducers: {
//     toogle(state) {
//       state.cartisVisible = !state.cartisVisible;
//     },
//   },
// });
// export const uiActions = uiSlice.actions;
// export default uiSlice;
