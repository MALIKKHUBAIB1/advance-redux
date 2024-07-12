import { createSlice } from "@reduxjs/toolkit";
const initialState = { cartVisible: false };
const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.cartVisible = !state.cartVisible;
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
