import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import favProductReducer from "./slices/favProductSlice"
import ProductReducer from "./slices/productsSlice"
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/CartSlice';
import WishlistReducer from './slices/wishlistSlice'
import userReducer from './slices/userSlice';
import addressReducer from './slices/addressSlice';
const store = configureStore({
  reducer: {
    category: categoryReducer,
    favProduct: favProductReducer,
    allProduct:ProductReducer,
    search: searchReducer,
    cart: cartReducer,
    wishlist:WishlistReducer,
    user: userReducer,
    address: addressReducer
   }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
