import { createSlice } from '@reduxjs/toolkit';

import { Locales } from '../../types/enums';

interface stateProps {
  isGeneralLoading: boolean;
  generalError: string | null;
  locale: Locales;
}

const initialState: stateProps = {
  isGeneralLoading: true,
  generalError: null,
  locale: Locales.EN,
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
    setIsGeneralLoading: (state, action) => {
      const { payload: status } = action;
      state.isGeneralLoading = status;
    },
    setPaginationLocale: (state, action) => {
      const { payload: locale } = action;
      state.locale = locale;
    },
  },
});

export const { setIsGeneralLoading, setPaginationLocale } = appSlice.actions;
