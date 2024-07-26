import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAuth } from '@/context/auth'
import { Models } from "appwrite"
export interface ProductInfo {
    ProductId: number
    Gender: string
    Category: string
    SubCategory: string
    ProductType: string
    Colour: string
    Usage: string
    ProductTitle: string
    ImageURL: string
    UnitPrice: GLfloat
}

interface IntialState {
    items: ProductInfo[],
}

const intialState: IntialState = {
    items: [],
}
const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState: intialState,
    reducers: {
        addItemToWishlist(state, action: PayloadAction<ProductInfo>) {
            const index = state.items.findIndex(item => String(item.ProductId) === String(action.payload.ProductId));
            if (index === -1) {
                state.items.push(action.payload);
            } else {
                state.items[index] = action.payload;
            }
        },
        removeItemfromWishlist(state, action: PayloadAction<ProductInfo>) {
            const index = state.items.findIndex((item) => {
                return item.ProductId == action.payload.ProductId
            })
            state.items.splice(index, 1)

        }
    }
})

export const { addItemToWishlist, removeItemfromWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer