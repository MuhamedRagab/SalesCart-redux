import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-project";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(thunkApi.getState().cart.errorMessage);
      return thunkApi.rejectWithValue(error);
    }
  }
);
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
  errorMessage: "Error fetching cart items",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, { payload }) => {
      const id = payload;
      const item = state.cartItems.find((item) => item.id === id);
      item.amount += 1;
    },
    decrease: (state, { payload }) => {
      const id = payload;
      const item = state.cartItems.find((item) => item.id === id);
      item.amount -= 1;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, { payload }) => {
      const id = payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    calulateTotal: (state) => {
      state.amount = 0;
      state.total = state.cartItems
        .reduce((total, item) => {
          state.amount += item.amount;
          return total + item.price * item.amount;
        }, 0)
        .toFixed(2);
    },
  },
  extraReducers: {
    [fetchCart.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCart.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.cartItems = payload;
    },
    [fetchCart.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, decrease, increase, removeItem, calulateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
