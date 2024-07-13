import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchAllProduct = createAsyncThunk('Products', async (page: number) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_ALLPRODUCT_URL!}?page=${page}&limit=10`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  });
  return response.data?.response;
});


const getAllProduct = createSlice({
  name: 'Product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default getAllProduct.reducer // Slice reducer that contains extraReducer