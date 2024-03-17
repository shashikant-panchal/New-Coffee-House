import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
    },
    addToCart: (state, action) => {
      const {id, name, image, price} = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          image,
          price,
          quantity: 1,
        });
      }
    },
    removeAllItems: state => {
      state.items = [];
    },
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  addToCart,
  removeAllItems,
} = cartSlice.actions;
export default cartSlice.reducer;
