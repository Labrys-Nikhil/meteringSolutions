// // src/redux/slices/powerChartSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// // Dummy chart data
// const initialState = {
//     charts: [
//         {
//             id: 1,
//             title: "Main Building",
//             labels: ["Jan", "Feb", "Mar", "Apr"],
//             dataPoints: [20, 30, 25, 40],
//             barColor: "#00ffff",
//             bgColor: "rgba(0,255,255,0.5)",
//         },

//     ],
// };

// const currentPowerChartSlice = createSlice({
//     name: "powerChart",
//     initialState,
//     reducers: {
//         addChart: (state, action) => {
//             state.charts.push(action.payload);
//         },
//         removeChart: (state, action) => {
//             state.charts = state.charts.filter((chart) => chart.id !== action.payload);
//         },
//         updateChart: (state, action) => {
//             const index = state.charts.findIndex((chart) => chart.id === action.payload.id);
//             if (index !== -1) {
//                 state.charts[index] = action.payload;
//             }
//         },
//     },
// });

// export const { addChart, removeChart, updateChart } = currentPowerChartSlice.actions;
// export const selectPowerCharts = (state) => state.powerChart.charts;
// export default currentPowerChartSlice.reducer;

// src/redux/slices/powerChartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  charts: [
    {
      id: 1,
      dashboard: "user",
      title: "Current Power Consumption",
      labels: ["Jan", "Feb", "Mar", "Apr", "Apr", "May", "June"],
      dataPoints: [20, 30, 25, 40, 30, 20, 3, 23, 4],
      //   barColor: "#00ffff",
      //   bgColor: "rgba(0,255,255,0.5)",
      backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
      borderColor: "rgba(75, 192, 192, 1)", // Border color
    },
    {
      id: 2,
      dashboard: "admin",
      title: "Admin Consumption",
      labels: ["Jan", "Feb", "Mar", "Apr"],
      dataPoints: [50, 60, 40, 70, 44, 33, 22],
      //   barColor: "#ffb703",
      //   bgColor: "rgba(255,183,3,0.5)",
      backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
      borderColor: "rgba(75, 192, 192, 1)", // Border color
    },
    {
      id: 3,
      dashboard: "superadmin",
      title: "Global Overview",
      labels: ["Jan", "Feb", "Mar", "Apr"],
      dataPoints: [80, 90, 75, 100],
      //   barColor: "#00ff84",
      //   bgColor: "rgba(0,255,132,0.5)",
      backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
      borderColor: "rgba(75, 192, 192, 1)", // Border color
    },
  ],
};

const currentPowerChartSlice = createSlice({
  name: "powerChart",
  initialState,
  reducers: {
    addChart: (state, action) => {
      state.charts.push(action.payload);
    },
    removeChart: (state, action) => {
      state.charts = state.charts.filter(
        (chart) => chart.id !== action.payload
      );
    },
    updateChart: (state, action) => {
      const index = state.charts.findIndex(
        (chart) => chart.id === action.payload.id
      );
      if (index !== -1) {
        state.charts[index] = action.payload;
      }
    },
  },
});

export const { addChart, removeChart, updateChart } =
  currentPowerChartSlice.actions;
export const selectChartsByDashboard = (dashboard) => (state) =>
  state.powerChart.charts.filter((chart) => chart.dashboard === dashboard);

export default currentPowerChartSlice.reducer;
