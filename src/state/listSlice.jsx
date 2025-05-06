import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listId: null,
  listItems: null,
  fromNewList: false,
};

const listSlice = createSlice({
  name: "listInfo",
  initialState,
  reducers: {
    selectList: (state, action) => {
      state.listId = action.payload.listId;
      state.listTitle = action.payload.listTitle;
      state.fromNewList = action.payload.fromNewList;
    },
    unSelectList: (state) => {
      state.listId = null;
      state.listTitle = null;
      state.listItems = null;
      state.fromNewList= false;
    },
    listItems: (state, action) => {
      state.listItems = action.payload.listItems;
    },
  },
});

export const { selectList, unSelectList } = listSlice.actions;
export default listSlice.reducer;
