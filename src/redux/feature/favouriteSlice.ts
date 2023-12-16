import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ICart} from '../../interfaces/cart';
import {IProduct} from '../../interfaces/product';
import {IFavourite} from '../../interfaces/favourite';

const initialState: IFavourite = {
  products: [],
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{
        product: IProduct;
      }>,
    ) => {
      let newState = state;

      newState.products.push(action.payload.product);
      return newState;
    },
    deleteProduct: (
      state,
      action: PayloadAction<{productId: number;}>,
    ) => {
      let newState = state;
      let productId = action.payload.productId;

      newState.products = state.products.filter(item => item.id !== productId);
      return newState;
    },
    updateFavorites: (state, action: PayloadAction<IFavourite>) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addProduct, deleteProduct, updateFavorites} =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
