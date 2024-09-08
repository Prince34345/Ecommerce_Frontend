import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appwrite } from '../../lib/appwrite-service'
import axios from "axios"

const user = appwrite.account.get()


export interface AddressInfo {
    addressId: string,
    firstName: string,
    lastName: string
    phoneNumber: string,
    email: string,
    StreetAddress1: string,
    StreetAddress2: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
    isDefault: boolean
}

interface IntialState {
    items: AddressInfo[],
    loading: boolean,
    error: string,
}


const intialState: IntialState = {
    items: [],
    loading: false,
    error: '',
}

export const getaddressThunk = createAsyncThunk('getaddress', async () => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/address/${(await user).$id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return response.data?.response
})

export const postaddressThunk = createAsyncThunk('postWishlist', async (addresses: AddressInfo[]) => {
    const User = await user
    const id = User.$id
    const response = await axios.patch(`${process.env.EXPO_PUBLIC_URL}/address/${id}`, {
        address: [...addresses]
    }, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.data?.response
})

const AddressSlice = createSlice({
    name: 'address',
    initialState: intialState,
    reducers: {
        addAddress(state, action: PayloadAction<AddressInfo>) {
            const index = state.items?.findIndex((item) => item.addressId == action.payload.addressId);
            console.log(index, "in slice function.");
            if (index === -1 || index === undefined) {
                if (state.items == undefined) {
                    state.items = []
                }
                const previousState = [...state.items, action.payload]
                state.items = previousState
            } else {
                state.items[index] = action?.payload;
            }
        },
        removeAddress(state, action: PayloadAction<AddressInfo>) {
            const index = state.items?.findIndex((item) => {
                return item.addressId == action.payload.addressId
            })
            state.items?.splice(index, 1)
        },
        removeAllAddresses(state) {
            state.items = [];
        },
        editAddress(state, action: PayloadAction<AddressInfo>) {
            state.items = state.items.map((item) => {
                if(item.addressId === action.payload.addressId){
                    return {
                        ...action.payload
                    }
                }
                return item
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getaddressThunk.pending, (state) => { state.loading = true; })
            .addCase(getaddressThunk.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.response; })
            .addCase(getaddressThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message! })
        builder.addCase(postaddressThunk.pending, (state) => { state.loading = true })
            .addCase(postaddressThunk.fulfilled, (state, action) => { state.loading = false; })
            .addCase(postaddressThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message! })
    }
})

export const { addAddress, removeAddress } = AddressSlice.actions;

export default AddressSlice.reducer