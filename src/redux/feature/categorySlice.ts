import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ICategory} from '../../interfaces/category';

const initialState: ICategory[] = [];

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategories: (state, action: PayloadAction<ICategory[]>) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateCategories} = categorySlice.actions;

export default categorySlice.reducer;
