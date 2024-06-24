import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import favProductReducer from "./slices/favProductSlice"
const store = configureStore({
  reducer: {
    category: categoryReducer,
    favProduct: favProductReducer
    // Add more reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
