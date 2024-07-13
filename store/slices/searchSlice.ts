import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'

interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
  queryString: string;
  page:number
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
  queryString: '',
  page: 1
};

export const fetchSearchProduct = createAsyncThunk('Products-Search', async ({ page, searchTerm }: {page: number, searchTerm: string}) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_ALLPRODUCT_URL!}/search?page=${page}&limit=10&searchTerm=${searchTerm}`,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  });
  return response.data?.SearchedProduct;
});


const getSearchProduct = createSlice({
  name: 'SearchProduct',
  initialState,
  reducers:{
    updateSearchTerm: (state, action: PayloadAction<string>) => {
        state.queryString = action.payload
    },
    updatePage: (state, action: PayloadAction<number>) => {
        state.page = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { updateSearchTerm, updatePage } = getSearchProduct.actions;
export default getSearchProduct.reducer // Slice reducer that contains extraReducer
