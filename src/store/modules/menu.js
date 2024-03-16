import { createSlice } from "@reduxjs/toolkit";
import { fetchAllMenus, fetchWeekMenus } from "./menuThunk";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuData: [],
    weekMenu: [],
    loading: "idle",
    error: null,
  },

  reducers: {
    setMenuData: (state, action) => {
      state.menuData = action.payload;
    },
    setWeekMenu: (state, action) => {
      state.weekMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenus.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAllMenus.fulfilled, (state, action) => {
        state.loading = "idle";
        state.menuData = action.payload;
      })
      .addCase(fetchAllMenus.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      })
      .addCase(fetchWeekMenus.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchWeekMenus.fulfilled, (state, action) => {
        state.loading = "idle";
        state.weekMenu = action.payload;
      })
      .addCase(fetchWeekMenus.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      });
  },
});

export const { setMenuData, setWeekMenu } = menuSlice.actions;

export default menuSlice.reducer;
