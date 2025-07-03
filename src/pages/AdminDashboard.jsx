{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-5 gap-4 p-4 h-full bg-gray-100 overflow-y-scroll auto-rows-min">
      
        <MetricsCard
          title="Total Users & Active Meters"
          value="44,071.00"
          change="30.8%"
          isPositive={true}
          className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1"
          isGraph={true}
          typeGraph="Line"
        />
        <MetricsCard
          title="Faulty Meters Detected"
          value="8.00"
          change="2.3%"
          isPositive={true}
          className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1"
        />
        <MetricsCard
          title="Total Next Payment"
          value="$2,829.00"
          change="-1.43%"
          isPositive={false}
          className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1"
        />
        <MetricsCard
          title="Total Energy Consumption"
          value="12,300 kWh"
          change="18.9%"
          isPositive={true}
          className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 row-span-1"
        />

     
         <CurrentPowerCard className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-3 row-span-1" /> 

       
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold mb-4">Usage Trends</h2>

            <div>
              <label className="block text-xs text-gray-500">From Date</label>
              <input
                type="date"
                value={startDate}
                max={today}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 px-2 py-1 border text-sm rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            {charts.map((chart) => {
              const filteredChart = filterChart(chart);
              return <CurrentPowerChart key={chart.id} {...filteredChart} />;
            })}
          </div>
        </div>
        <CalendarCard className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-2 row-span-1" />

     
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1">
          📢 Alerts Summary
        </div>
        <HighlightCard className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1" />
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1">
          ⚡ Energy Usage
        </div>
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 row-span-1">
          <FaTachometerAlt className="text-green-500 text-3xl mr-3" />
          <h1 className="">Active Meter</h1>
          <h1 className="">25/30</h1>
          <h1 className="">Final Target Finished</h1>
        </div>

       
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3 row-span-1 bg-white shadow-md rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-2">Detailed Statistics</h3>
          <p className="text-gray-600 text-sm">
            Graphical analysis of meter activity and payments.
          </p>
        </div> 
      </div> */}

import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MetricsCard from "../components/MetricsCard";
import CurrentPowerCard from "../components/CurrrentPower";
import HighlightCard from "../components/Highlight";
import CalendarCard from "../components/Calender";
import { FaTachometerAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { selectChartsByDashboard } from "../redux/slice/currentPowerChartSlice";
import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
import Header from "../components/header/Header";
import CurrentPowerChart from "../components/meterManagement/CurrentPowerChart";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const charts = useSelector(selectChartsByDashboard("admin"));
  const [startDate, setStartDate] = useState("2025-04-01");
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("AdminDashboard"));
    dispatch(
      setBreadcrumbs([
        // Updated label for clarity
        { label: "AdminDashboard" },
      ])
    );
  }, []);

  const filterChart = (chart) => {
    const from = new Date(startDate);
    const to = new Date();

    const filteredLabels = [];
    const filteredDataPoints = [];

    chart.labels.forEach((label, i) => {
      const fakeDate = new Date(
        `2025-${(i + 1).toString().padStart(2, "0")}-01`
      );
      if (fakeDate >= from && fakeDate <= to) {
        filteredLabels.push(label);
        filteredDataPoints.push(chart.dataPoints[i]);
      }
    });

    return {
      ...chart,
      labels: filteredLabels,
      dataPoints: filteredDataPoints,
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <Header />
      <div className="h-[10%] px-6 py-3 bg-green-50">
        <div className="flex justify-between items-center">
          {/* Revenue Section */}
          <div className="flex flex-col gap-1">
            <span className="font-md font-semibold text-gray-600">
              Your Total Revenue
            </span>
            <span className="text-xl font-bold"> $ 95,000 </span>
          </div>
          {/* Download Section */}
          <div className="text-sm text-gray-700">📥 Data to Download</div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4 h-full bg-gray-100 overflow-y-scroll auto-rows-min">
  

  <MetricsCard
    title="Total Users & Active Meters"
    value="44,071.00"
    change="30.8%"
    isPositive={true}
    className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2"
    isGraph={true}
    typeGraph="Line"
  />
  <MetricsCard
    title="Faulty Meters Detected"
    value="8.00"
    change="2.3%"
    isPositive={true}
    className="col-span-1 sm:col-span-1 lg:col-span-1"
  />
  <MetricsCard
    title="Total Next Payment"
    value="$2,829.00"
    change="-1.43%"
    isPositive={false}
    className="col-span-1 sm:col-span-1 lg:col-span-1"
  />
  <MetricsCard
    title="Total New Orders"
    value="5,230"
    change="-1.43%"
    isPositive={false}
    className="col-span-1 sm:col-span-2 lg:col-span-1"
  />


  <CurrentPowerCard className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3 row-span-1" />
  <HighlightCard className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1 bg-black text-white" />

 
  <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3">
    🏆 Recent Comparative Progress
  </div>
  <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 lg:col-span-1 xl:col-span-1">
    ⚡ Active Meter
  </div>
  <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 lg:col-span-1 xl:col-span-1">
    📞 Contact Support
  </div>
  <div className="bg-red-500 text-white shadow-md rounded-2xl p-4 col-span-1 lg:col-span-1 xl:col-span-1">
    📅 Calendar Schedule
  </div>
</div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-5 gap-4 p-4 h-full bg-gray-100 overflow-y-scroll auto-rows-min">
        {/* First Row: 4 elements */}
        <MetricsCard
          title="Total Users & Active Meters"
          value="44,071.00"
          change="30.8%"
          isPositive={true}
          className="col-span-1 sm:col-span-2 xl:col-span-2 row-span-1"
          isGraph={true}
          typeGraph="Line"
        />
        <MetricsCard
          title="Faulty Meters Detected"
          value="8.00"
          change="2.3%"
          isPositive={true}
          className="col-span-1 xl:col-span-1 row-span-1"
        />
        <MetricsCard
          title="Total Next Payment"
          value="$2,829.00"
          change="-1.43%"
          isPositive={false}
          className="col-span-1 xl:col-span-1 row-span-1"
        />
        <MetricsCard
          title="Total Energy Consumption"
          value="12,300 kWh"
          change="18.9%"
          isPositive={true}
          className="col-span-1 sm:col-span-2 xl:col-span-1 row-span-1"
        />

        {/* Second Row: Chart Section full width */}
        <div className="bg-white rounded-lg shadow p-4 col-span-1 sm:col-span-2 xl:col-span-5 row-span-1">
          <div className="flex justify-between flex-wrap gap-4">
            <h2 className="text-lg font-bold">Usage Trends</h2>
            <div>
              <label className="block text-xs text-gray-500">From Date</label>
              <input
                type="date"
                value={startDate}
                max={today}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 px-2 py-1 border text-sm rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            {charts.map((chart) => {
              const filteredChart = filterChart(chart);
              return <CurrentPowerChart key={chart.id} {...filteredChart} />;
            })}
          </div>
        </div>

        {/* Third Row: 4 elements */}
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 xl:col-span-1 row-span-1">
          📢 Alerts Summary
        </div>
        <HighlightCard className="col-span-1 sm:col-span-2 xl:col-span-2 row-span-1" />
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 xl:col-span-1 row-span-1">
          ⚡ Energy Usage
        </div>
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 xl:col-span-1 row-span-1 flex flex-col justify-center items-start">
          <FaTachometerAlt className="text-green-500 text-3xl mb-2" />
          <h1 className="text-lg font-semibold">Active Meter</h1>
          <h2 className="text-md font-medium">25/30</h2>
          <p className="text-sm text-gray-600">Final Target Finished</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
