import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer'; 

const store = configureStore({
    reducer: {
      files: reducer,
    },
  });
export default store;
