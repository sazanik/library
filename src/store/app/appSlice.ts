import { createSlice } from '@reduxjs/toolkit';

interface stateProps {
  generalLoading: boolean;
  generalError: string | null;
}

const initialState: stateProps = {
  generalLoading: true,
  generalError: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action) => {
      const { payload: error } = action;
      state.generalError = error;
    },
    clearError: (state) => {
      state.generalError = null;
    },
    setLoading: (state, action) => {
      const { payload: status } = action;
      state.generalLoading = status;
    },
  },
});

export const { setLoading } = appSlice.actions;
