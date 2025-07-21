import React from "react";
import { combineReducers } from "@reduxjs/toolkit";
import headerReducer from "../slice/headerSlice";
import currentPowerChartReducer  from '../slice/currentPowerChartSlice'
import initialUserDashboardReducer from '../slice/userDashboardSlice'
import authSlice from '../slice/authSlice';

const rootReducer = combineReducers({
  header: headerReducer, // Correct structure
  powerChart : currentPowerChartReducer,
  userDashboard : initialUserDashboardReducer,
  auth: authSlice,
});

export default rootReducer;
