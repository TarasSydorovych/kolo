import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productsToAdd = action.payload; // Масив об'єктів
    
      productsToAdd.forEach((product) => {
        const { uid, prodName, quantity, price } = product;
    
        const existingProduct = state.products.find((p) => p.uid === uid);
        if (existingProduct) {
          const updatedProduct = {
            ...existingProduct,
            quantity: existingProduct.quantity 
          };
          const productIndex = state.products.findIndex((p) => p.uid === uid);
          state.products[productIndex] = updatedProduct;
        } else {
          state.products.push({
            uid,
            prodName,
            quantity,
            price
          });
        }
      });
    },
    // updateQuantity: (state, action) => {
    //   const { uid, quantity } = action.payload;
    //   const existingProduct = state.products.find(product => product.uid === uid);
    //   if (existingProduct) {
    //     existingProduct.quantity = quantity;
    //   }
    // },
    updateQuantity: (state, action) => {
      const uid = action.payload.uid;
      const quantity = action.payload.quantity;
      
      const productIndex = state.products.findIndex(product => product.uid === uid);
      if (productIndex !== -1) {
        state.products[productIndex].quantity = quantity;
      }
    },
    removeProduct: (state, action) => {
      const uidToRemove = action.payload;
   
      state.products = state.products.filter(product => product.uid !== uidToRemove);
    },
    clearProducts: (state) => {
      state.products = [];
    }
  }
});

export const { addProduct, updateQuantity, removeProduct, clearProducts } = orderSlice.actions;

export default orderSlice.reducer;