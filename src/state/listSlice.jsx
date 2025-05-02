import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listId: null,
  listItems: null,
};

const listSlice = createSlice({
  name: "listInfo",
  initialState,
  reducers: {
    selectList: (state, action) => {
      state.listId = action.payload.listId;
    },
    unSelectList: (state) => {
      state.listId = null;
      state.listItems = null;
    },
    listItems: (state, action) => {
      state.listItems = action.payload.listItems;
    },
  },
});

export const { selectList, unSelectList } = listSlice.actions;
export default listSlice.reducer;
