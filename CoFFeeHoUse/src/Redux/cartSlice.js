import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    increaseQuantity: (state, action) => {
        const itemId = action.payload;
        const item = state.items.find((item) => item.id === itemId);
  
        if (item) {
          item.quantity += 1;
        }
      },
      decreaseQuantity: (state, action) => {
        const itemId = action.payload;
        const item = state.items.find((item) => item.id === itemId);
  
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      },
      removeItem: (state, action) => {
        const itemId = action.payload;
        state.items = state.items.filter((item) => item.id !== itemId);
      },
    addToCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: itemId,
          quantity: 1,
        });
      }
    },
  },
});

export const { increaseQuantity, decreaseQuantity, removeItem, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
