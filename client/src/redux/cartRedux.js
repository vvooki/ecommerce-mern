import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { publicRequest } from '../requestMethods';

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchUserCart: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },

    addProduct: (state, action) => {
      const update = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (update) {
        update.quantity += action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }

      state.total += action.payload.price * action.payload.quantity;
    },

    increaseProductAmount: (state, action) => {
      let price = 0;
      let newProducts = state.products.map((item) => {
        if (item._id === action.payload) {
          price = item.price;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      let tot = state.total + price;
      return {
        ...state,
        products: newProducts,
        total: tot,
      };
    },

    decreaseProductAmount: (state, action) => {
      let price = 0;
      let newProducts = state.products.map((item) => {
        if (item._id === action.payload) {
          price = item.price;
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      let tot = state.total - price;
      return {
        ...state,
        products: newProducts,
        total: tot,
      };
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    removeItem: (state, action) => {
      let newProducts = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      let len = state.products.length - 1;
      let tot = state.total - action.payload.price * action.payload.quantity;
      console.log(len);
      return {
        ...state,
        products: newProducts,
        quantity: len,
        total: tot,
      };
    },

    // getTotals: (state) => {
    //   let { total } = state.products.reduce(
    //     (cartTotal, cartItem) => {
    //       const { price, quantity } = cartItem;
    //       cartTotal.total += quantity * price;
    //       cartTotal.quantity += quantity;
    //       return cartTotal;
    //     },
    //     {
    //       total: 0,
    //     }
    //   );
    //   total = parseFloat(total.toFixed(2));
    //   return { ...state, total };
    // },
  },
});

const App = () => {
  useEffect(() => {});
};

export const {
  fetchUserCart,
  addProduct,
  increaseProductAmount,
  decreaseProductAmount,
  clearCart,
  removeItem,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
