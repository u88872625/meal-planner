import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMenus, getWeekMenus } from "../../../firebase/firestore";

export const fetchWeekMenus = createAsyncThunk(
  "menu/fetchWeekMenus",
  async ({ startOfWeek, endOfWeek }, { rejectWithValue }) => {
    try {
      const weekMenus = await getWeekMenus(startOfWeek, endOfWeek);
      return weekMenus;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllMenus = createAsyncThunk(
  "menu/fetchAllMenus",
  async (_, { rejectWithValue }) => {
    try {
      const menus = await getAllMenus();
      return menus;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
