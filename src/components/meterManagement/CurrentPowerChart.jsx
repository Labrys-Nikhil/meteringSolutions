
// import React from "react";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar, Line } from "react-chartjs-2";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend
// );

// // const options = {
// //   responsive: true,
// //   maintainAspectRatio: false,
// //   plugins: {
// //     legend: {
// //       display: false,
// //     },
// //   },
// //   scales: {
// //     x: {
// //       ticks: { color: "#374151",    autoSkip: false, },
// //       grid: { display: false },
// //       // ticks: {
// //       //   autoSkip: false
// //       // }
// //     },
// //     y: {
// //       ticks: { color: "#374151" },
// //       grid: { display: false },
// //     },
// //   },
// // };

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: false,
//     },
//     tooltip: {
//   callbacks: {
//     label: function (context) {
//       let label = context.dataset.label || "";
//       let value = parseFloat(context.raw).toFixed(2); // kWh value

//       const rawItem = context.chart.data.rawData?.[context.dataIndex];

//       if (rawItem) {
//         // For EB
//         if (label.includes("EB")) {
//           const costPerUnit = rawItem.costEbPerUnit ?? 0;
//           const totalCost = (parseFloat(value) * costPerUnit).toFixed(2);
//           return `${label}: ${value} kWh | Cost/Unit: ${costPerUnit} | Total Cost: ₹${totalCost}`;
//         }
//         // For DG
//         if (label.includes("DG")) {
//           const costPerUnit = rawItem.costDgPerUnit ?? 0;
//           const totalCost = (parseFloat(value) * costPerUnit).toFixed(2);
//           return `${label}: ${value} kWh | Cost/Unit: ${costPerUnit} | Total Cost: ₹${totalCost}`;
//         }
//       }

//       // Default (Latest Total Consumption)
//       return `${label}: ${value} kWh`;
//     },
//   },
// },

//   },
// scales: {
//   x: {
//     ticks: { color: "#374151", autoSkip: false },
//     grid: { display: false },
//   },
//   y: {
//     ticks: { color: "#374151" },
//     grid: { display: false },
//   },
// },
// };




// // const CurrentPowerChart = ({
// //   className = "",
// //   title = "",
// //   labels = [],
// //   datasets = [],  // <-- updated
// // }) => {
// //   const hasData = Array.isArray(datasets) && datasets.length > 0;

// //   const data = {
// //     labels,
// //     datasets,
// //   };

// const CurrentPowerChart = ({
//   className = "",
//   title = "",
//   labels = [],
//   datasets = [],
//   rawData = "aedwdedekmmk" //-- added
// }) => {
//   const hasData = Array.isArray(datasets) && datasets.length > 0;

//   const data = {
//     labels,
//     datasets,
//     rawData,
//   };
//   console.log('chacking the data format',data);

//   return (
//     <div
//       className={`bg-slate-100/20 rounded-md shadow-xs w-full max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] h-auto p-4 hover:shadow-sm transition-all duration-300 ${className}`}
//     >
//       <h4 className="text-gray-700 font-bold">{title}</h4>

//       {/* <div className="w-full max-w-[300px] sm:max-w-none aspect-[2/1] mt-6 h-[350px] flex items-center justify-center mx-auto">
//         {hasData ? (
//           <Bar data={data} options={options} />
//         ) : (
//           <p className="text-gray-500 text-lg font-medium">Data Not Found</p>
//         )} */}
//          <div className="w-full max-w-[300px] sm:max-w-none aspect-[2/1] mt-6 h-[350px] flex items-center justify-center mx-auto">
//         {hasData ? (
//           <Bar data={data} options={options} />
//         ) : (
//           <p className="text-gray-500 text-lg font-medium">Data Not Found</p>
//         )}

//       </div>
//     </div>
//   );
// };


// export default CurrentPowerChart;

// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import { Bar } from "react-chartjs-2";

// // register chart + plugin
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// const CurrentPowerChart = ({
//   className = "",
//   title = "",
//   labels = [],
//   datasets = [],
//   rawData = []
// }) => {
//   const hasData = Array.isArray(datasets) && datasets.length > 0;

//   // toggle for datalabels
//   const [showLabels, setShowLabels] = useState(true);

//   const data = {
//     labels,
//     datasets,
//   };

//   // const options = {
//   //   responsive: true,
//   //   maintainAspectRatio: false,
//   //   plugins: {
//   //     legend: {
//   //       position: "top",
//   //     },
//   //     tooltip: {
//   //       enabled: true,
//   //     },
//   //     datalabels: {
//   //       display: showLabels, // toggle on/off
//   //       color: "black",
//   //       anchor: "end",
//   //       align: "top",
//   //       formatter: (value) => value.toFixed(2),
//   //     },
//   //     scales: {
//   //       x: {
//   //         ticks: { color: "#374151", autoSkip: false },
//   //         grid: { display: false },
//   //       },
//   //       y: {
//   //         ticks: { color: "#374151" },
//   //         grid: { display: false },
//   //       },
//   //     },
//   //   },
//   // };

//     const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       intersect: false,
//       mode: 'index',
//     },
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           padding: 20,
//           usePointStyle: true,
//           pointStyle: 'circle',
//           font: {
//             size: window.innerWidth < 768 ? 12 : 14,
//             weight: '500'
//           },
//           color: '#374151'
//         }
//       },
//       tooltip: {
//         enabled: true,
//         backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         titleColor: 'white',
//         bodyColor: 'white',
//         borderColor: 'rgba(59, 130, 246, 1)',
//         borderWidth: 1,
//         cornerRadius: 8,
//         displayColors: true,
//         callbacks: {
//           label: function(context) {
//             return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} kW`;
//           }
//         }
//       },
//       datalabels: {
//         display: showLabels,
//         color: '#1f2937',
//         font: {
//           size: window.innerWidth < 768 ? 10 : 12,
//           weight: 'bold'
//         },
//         anchor: 'end',
//         align: 'top',
//         offset: 4,
//         formatter: (value) => value.toFixed(1),
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         borderColor: 'rgba(59, 130, 246, 0.3)',
//         borderWidth: 1,
//         borderRadius: 4,
//         padding: 4
//       }
//     },
//     scales: {
//       x: {
//         ticks: { 
//           color: "#374151",
//           font: {
//             size: window.innerWidth < 768 ? 10 : 12
//           },
//           maxRotation: window.innerWidth < 768 ? 45 : 0,
//           autoSkip: window.innerWidth < 480 ? true : false,
//           maxTicksLimit: window.innerWidth < 480 ? 6 : undefined
//         },
//         grid: { 
//           display: false 
//         },
//         border: {
//           display: true,
//           color: '#e5e7eb'
//         }
//       },
//       y: {
//         beginAtZero: true,
//         ticks: { 
//           color: "#374151",
//           font: {
//             size: window.innerWidth < 768 ? 10 : 12
//           },
//           callback: function(value) {
//             return value + ' kW';
//           }
//         },
//         grid: { 
//           display: true,
//           color: 'rgba(0, 0, 0, 0.05)'
//         },
//         border: {
//           display: true,
//           color: '#e5e7eb'
//         }
//       },
//     },
//     animation: {
//       duration: 1000,
//       easing: 'easeInOutQuart'
//     }
//   };

//   return (
//     <div
//       className={`bg-slate-100/20 rounded-md shadow-xs w-full max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] h-auto p-4 hover:shadow-sm transition-all duration-300 ${className}`}
//     >
//       <div className="flex justify-between items-center">
//         <h4 className="text-gray-700 font-bold">{title}</h4>
//         {hasData && (
//           <button
//             onClick={() => setShowLabels(!showLabels)}
//             className="text-xs px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
//           >
//             {showLabels ? "Hide Data Labels" : "Show Data Labels"}
//           </button>
//         )}
//       </div>

//       <div className="w-full max-w-[300px] sm:max-w-none aspect-[2/1] mt-6 h-[350px] flex items-center justify-center mx-auto">
//         {hasData ? (
//           <Bar data={data} options={options} />
//         ) : (
//           <p className="text-gray-500 text-lg font-medium">Data Not Found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CurrentPowerChart;

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

// Register chart + plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CurrentPowerChart = ({
  className = "",
  title = "",
  labels = [],
  datasets = [],
}) => {
  const hasData = Array.isArray(datasets) && datasets.length > 0;

  // Toggle for datalabels
  const [showLabels, setShowLabels] = useState(true);

  const data = {
    labels,
    datasets,
  };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   interaction: {
  //     intersect: false,
  //     mode: "index",
  //   },
  //   plugins: {
  //     legend: {
  //       position: "top",
  //       labels: {
  //         padding: 16,
  //         usePointStyle: true,
  //         pointStyle: "circle",
  //         font: {
  //           size: window.innerWidth < 768 ? 12 : 14,
  //           weight: 500,
  //         },
  //         color: "#374151",
  //       },
  //     },
  //     tooltip: {
  //       enabled: true,
  //       backgroundColor: "rgba(0,0,0,0.85)",
  //       titleColor: "#ffffff",
  //       bodyColor: "#f9f9f9",
  //       borderColor: "rgba(59,130,246,0.8)",
  //       borderWidth: 1,
  //       cornerRadius: 6,
  //       padding: 10,
  //       displayColors: true,
  //       callbacks: {
  //         label: function (context) {
  //           return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} kW`;
  //         },
  //       },
  //     },
  //     datalabels: {
  //       display: showLabels,
  //       color: "#1f2937",
  //       font: {
  //         size: window.innerWidth < 768 ? 10 : 12,
  //         weight: "600",
  //       },
  //       anchor: "end",
  //       align: "top",
  //       offset: 4,
  //       formatter: (value) => value.toFixed(1),
  //       backgroundColor: "rgba(255, 255, 255, 0.9)",
  //       borderColor: "rgba(59,130,246,0.2)",
  //       borderWidth: 1,
  //       borderRadius: 4,
  //       padding: 4,
  //     },
  //   },
  //   scales: {
  //     x: {
  //       ticks: {
  //         color: "#374151",
  //         font: { size: window.innerWidth < 768 ? 10 : 12 },
  //         maxRotation: window.innerWidth < 768 ? 45 : 0,
  //         autoSkip: window.innerWidth < 480,
  //         maxTicksLimit: window.innerWidth < 480 ? 6 : undefined,
  //       },
  //       grid: { display: false },
  //       border: { display: true, color: "#e5e7eb" },
  //     },
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         color: "#374151",
  //         font: { size: window.innerWidth < 768 ? 10 : 12 },
  //         callback: (value) => `${value} kW`,
  //       },
  //       grid: {
  //         display: true,
  //         color: "rgba(0,0,0,0.05)",
  //         borderDash: [4, 2],
  //       },
  //       border: { display: true, color: "#e5e7eb" },
  //     },
  //   },
  //   animation: {
  //     duration: 1200,
  //     easing: "easeOutQuart",
  //   },
  // };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: true, // only the hovered bar
      mode: "nearest", // nearest bar only
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: window.innerWidth < 768 ? 12 : 14,
            weight: 500,
          },
          color: "#374151",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.85)",
        titleColor: "#ffffff",
        bodyColor: "#f9f9f9",
        borderColor: "rgba(59,130,246,0.8)",
        borderWidth: 1,
        cornerRadius: 6,
        padding: 10,
        displayColors: true,
        callbacks: {
          // Shows only the hovered bar value
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} kW`;
          },
        },
      },
      datalabels: {
        display: showLabels,
        color: "#1f2937",
        font: {
          size: window.innerWidth < 768 ? 10 : 12,
          weight: "600",
        },
        anchor: "end",
        align: "top",
        offset: 4,
        formatter: (value) => value.toFixed(1),
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(59,130,246,0.2)",
        borderWidth: 1,
        borderRadius: 4,
        padding: 4,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151",
          font: { size: window.innerWidth < 768 ? 10 : 12 },
          maxRotation: window.innerWidth < 768 ? 45 : 0,
          autoSkip: window.innerWidth < 480,
          maxTicksLimit: window.innerWidth < 480 ? 6 : undefined,
        },
        grid: { display: false },
        border: { display: true, color: "#e5e7eb" },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#374151",
          font: { size: window.innerWidth < 768 ? 10 : 12 },
          callback: (value) => `${value} kW`,
        },
        grid: {
          display: true,
          color: "rgba(0,0,0,0.05)",
          borderDash: [4, 2],
        },
        border: { display: true, color: "#e5e7eb" },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md w-full max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] p-6 transition-shadow duration-300 hover:shadow-lg ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-gray-700 font-semibold text-lg">{title}</h4>
        {hasData && (
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="text-xs px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {showLabels ? "Hide Labels" : "Show Labels"}
          </button>
        )}
      </div>

      <div className="w-full h-[350px] sm:h-[400px] flex items-center justify-center">
        {hasData ? (
          <Bar data={data} options={options} />
        ) : (
          <p className="text-gray-400 text-lg font-medium">No Data Available</p>
        )}
      </div>
    </div>
  );
};

export default CurrentPowerChart;
