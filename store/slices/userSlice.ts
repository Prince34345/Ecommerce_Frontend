import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appwrite } from '../../lib/appwrite-service'
import axios from "axios"
import { ProductInfo } from "./wishlistSlice"

const user = appwrite.account.get()


export interface UserInfo {
    usernname?: string
    email?: string
    userId?: string
    wishlist?: ProductInfo[]
}



interface IntialState {
    User:UserInfo
    loading: boolean,
    error: string,
   
}

const intialState: IntialState = {
    User: {},
    loading: false,
    error: '',
}
export const getUserThunk = createAsyncThunk('getUser', async () => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/user/${(await user).$id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    console.log("data from thunk", response.data)
    return response.data
})
export const postUserThunk = createAsyncThunk('postUser', async (id: string) => {
    console.log("post thunk called", id)
    const response = await axios.post(`${process.env.EXPO_PUBLIC_URL}/user/${id}`, {} ,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    console.log("data from post thunk", response.data)
    return response.data
})
const UserSlice = createSlice({
    name: 'wishlist',
    initialState: intialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserThunk.pending, (state) => { state.loading = true; })
               .addCase(getUserThunk.fulfilled, (state, action) => { state.loading = false; state.User = action.payload })
               .addCase(getUserThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message! })
        builder.addCase(postUserThunk.pending, (state) => { state.loading = true })
               .addCase(postUserThunk.fulfilled, (state, action) => { state.loading = false; state.User = action.payload; })
               .addCase(postUserThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message!})
    }
})


export default UserSlice.reducer