import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ICart} from '../../interfaces/cart';
import {IProduct} from '../../interfaces/product';

const initialState: ICart = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{
        product: IProduct;
        quantity: number;
        size: string;
      }>,
    ) => {
      let newState = state;
      let productId = action.payload.product.id;
      let foundProduct = state.items.find(
        item =>
          item.product.id === productId && item.size === action.payload.size,
      );
      if (foundProduct) {
        updateQuantityFN(
          state,
          productId,
          action.payload.quantity,
          action.payload.size,
        );
      } else {
        newState.items.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
          size: action.payload.size,
        });
        return newState;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
        size: string;
      }>,
    ) => {
      console.log('payload.updateQuantity', action.payload);

      if (action.payload.quantity <= 0) {
        deleteProductCB(state, action.payload.productId, action.payload.size);
      } else {
        let newState = state;
        let productId = action.payload.productId;
        let index = newState.items.findIndex(
          item =>
            item.product.id === productId && item.size === action.payload.size,
        );
        newState.items[index] = {
          ...newState.items[index],
          quantity: action.payload.quantity,
        };
        console.log('newState', newState);

        return newState;
      }
    },
    deleteProduct: (
      state,
      action: PayloadAction<{productId: number; size: string}>,
    ) => {
      let newState = state;
      let productId = action.payload.productId;
      let size = action.payload.size;

      newState.items = state.items.filter(item =>
        item.product.id === productId && item.size === size ? false : true,
      );
      return newState;
    },
    emptyCart: (state) => {
      return initialState;
    },
  },
});

const updateQuantityFN = (
  state: ICart,
  productId: number,
  quantity: number,
  size: string,
) => {
  cartSlice.caseReducers.updateQuantity(state, {
    type: 'updateQuantity',
    payload: {productId, quantity, size},
  });
};

const deleteProductCB = (state: ICart, productId: number, size: string) => {
  cartSlice.caseReducers.deleteProduct(state, {
    type: 'deleteProduct',
    payload: {productId, size},
  });
};

// Action creators are generated for each case reducer function
export const {addProduct, updateQuantity, deleteProduct, emptyCart} = cartSlice.actions;

export default cartSlice.reducer;
