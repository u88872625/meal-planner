import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// const currentDate = moment();
const currentDateStr = moment().format(); // 默认为 ISO 8601 格式字符串
const startOfWeekStr = moment().startOf("week").format();
const endOfWeekStr = moment().endOf("week").format();
const initialState = {
  currentDate: currentDateStr,
  startOfWeek: startOfWeekStr,
  endOfWeek: endOfWeekStr,
  date: "",
  nextDate: "",
  selectedDate: "",
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setNextDate: (state, action) => {
      state.nextDate = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDate, setNextDate, setSelectedDate } = dateSlice.actions;

export default dateSlice.reducer;
