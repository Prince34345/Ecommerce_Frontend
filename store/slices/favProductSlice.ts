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

export const fetchFavProduct = createAsyncThunk('favProduct', async () => {
  const response = await axios.get(process.env.EXPO_PUBLIC_FAVPRODUCT_URL!,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  });
  return response.data;
});


const getFavProduct = createSlice({
  name: 'favProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFavProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default getFavProduct.reducer // Slice reducer that contains extraReducer