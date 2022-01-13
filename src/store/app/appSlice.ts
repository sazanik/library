import { createSlice } from '@reduxjs/toolkit';
import {
  bdCreateAuthor,
  bdGetAllAuthors,
  bdUpdateAuthor,
} from '../authors/actions';

const initialState = {
  loading: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bdCreateAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(bdCreateAuthor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bdUpdateAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(bdUpdateAuthor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bdGetAllAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(bdGetAllAuthors.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, stopLoading } = appSlice.actions;
