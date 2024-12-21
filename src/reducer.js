import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filesData: [],
  loading: true,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFilesData: (state, action) => {
      state.filesData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setFilesData, setLoading } = filesSlice.actions;
export default filesSlice.reducer;