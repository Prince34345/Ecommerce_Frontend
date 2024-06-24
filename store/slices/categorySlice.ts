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

export const fetchCategory = createAsyncThunk('categories', async () => {
  const response = await axios.get(process.env.EXPO_PUBLIC_CATEGORY_URL!,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  });
  return response.data;
});


const getCategory = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default getCategory.reducer // Slice reducer that contains extraReducer