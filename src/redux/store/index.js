import React from "react";
import { combineReducers } from "@reduxjs/toolkit";
import headerReducer from "../slice/headerSlice";
import currentPowerChartReducer  from '../slice/currentPowerChartSlice'

const rootReducer = combineReducers({
  header: headerReducer, // Correct structure
  powerChart : currentPowerChartReducer
});

export default rootReducer;
