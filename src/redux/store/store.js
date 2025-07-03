import { configureStore } from "@reduxjs/toolkit";
import rootReducer from ".";

// Create and configure store
const store = configureStore({
    reducer: rootReducer, // Pass rootReducer directly
});
  
export default store;


