import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { TTimeRange } from "@/store/api/dashboard/dashboard.types";

interface IDashboardState {
  filter: TTimeRange;
}

const initialState: IDashboardState = {
  filter: "all",
};

export const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<TTimeRange>) {
      state.filter = action.payload;
    },
  },
  selectors: {
    selectFilter: (state) => state.filter,
  },
});

export const { setFilter } = dashboardSlice.actions;
export const { selectFilter } = dashboardSlice.selectors;

export default dashboardSlice.reducer;
