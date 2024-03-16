import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./modules/menu";
import dateReducer from "./modules/date";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    date: dateReducer,
  },
});
