import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import favProductReducer from "./slices/favProductSlice"
import ProductReducer from "./slices/productsSlice"
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/CartSlice';
const store = configureStore({
   
  reducer: {
    category: categoryReducer,
    favProduct: favProductReducer,
    allProduct:ProductReducer,
    search: searchReducer,
    cart: cartReducer
    // Add more reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
