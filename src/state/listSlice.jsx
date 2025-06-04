import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listId: null,
  listItems: null,
  listTitle: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    selectList: (state, action) => {
      state.listId = action.payload.listId;
      state.listTitle = action.payload.listTitle;
    },
    unSelectList: (state) => {
      state.listId = null;
      state.listTitle = null;
      state.listItems = null;
    },
    listItems: (state, action) => {
      state.listItems = action.payload.listItems;
    },
  },
});

export const { selectList, unSelectList } = listSlice.actions;
export default listSlice.reducer;
