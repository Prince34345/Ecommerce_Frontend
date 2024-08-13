import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appwrite } from '../../lib/appwrite-service'
import axios from "axios"

const user = appwrite.account.get()


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
    loading: boolean,
    error: string,
}


const intialState: IntialState = {
    items: [],
    loading: false,
    error: '',
}

export const getwishlistThunk = createAsyncThunk('getwishlist', async () => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/wishlist/${(await user).$id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    console.log("response")
    return response.data
})

export const postwishlistThunk = createAsyncThunk('postWishlist', async (Products: ProductInfo[]) => {
    const User = await user
    const id = User.$id
    const response = await axios.patch(`${process.env.EXPO_PUBLIC_URL}/wishlist/${id}`, {
        wishlist: [...Products]
    }, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.data
})

const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState: intialState,
    reducers: {
        addItemToWishlist(state, action: PayloadAction<ProductInfo>) {
            const index = state.items.findIndex(item => String(item.ProductId) === String(action.payload.ProductId));
            console.log("index", index, state, action.payload)
            if (!index || !state.items.length) {
                state?.items?.push(action?.payload);
            } else {
                state.items[index] = action?.payload;
            }
        },
        removeItemfromWishlist(state, action: PayloadAction<ProductInfo>) {
            const index = state.items.findIndex((item) => {
                return item.ProductId == action.payload.ProductId
            })
            state.items.splice(index, 1)
        },
        removeAllfromWishlist(state) {
            state.items.splice(0, state.items.length)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getwishlistThunk.pending, (state) => { state.loading = true; })
               .addCase(getwishlistThunk.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.response.wishlist })
               .addCase(getwishlistThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message! })
        builder.addCase(postwishlistThunk.pending, (state) => { state.loading = true })
               .addCase(postwishlistThunk.fulfilled, (state, action) => { state.loading = false; state.items = action.payload?.response; })
               .addCase(postwishlistThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message!})
    }
})

export const { addItemToWishlist, removeItemfromWishlist,  } = WishlistSlice.actions;

export default WishlistSlice.reducer