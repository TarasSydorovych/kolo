import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import filtersReducer from './filtersSlice';
import orderReducer from './orderSlice'
const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    orders: orderReducer,
  },
});

export default store;