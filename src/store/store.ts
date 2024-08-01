import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer"; // Assuming you have a root reducer combining all your reducers

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export default store;
