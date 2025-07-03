// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import Header from "../components/header/Header";

// const Invoice = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setHeaderTitle("Invoice"));
//     dispatch(
//       setBreadcrumbs([
//         { label: "Home", link: "/home" },  // Updated label for clarity
//         { label: "Invoice" },
//       ])
//     );
//   }, []);

//   return (
//     <div className="w-full h-full">
//       <Header />
//       {/* Page content goes here */}
//     </div>
//   );
// };

// export default Invoice;

// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import Header from "../components/header/Header";

// const Invoice = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setHeaderTitle("Invoice"));
//     dispatch(
//       setBreadcrumbs([{ label: "Home", link: "/home" }, { label: "Invoice" }])
//     );
//   }, [dispatch]);

//   // Sample user invoice list
//   const userInvoices = [
//     {
//       id: "user1",
//       name: "John Doe",
//       address: "123 Main St, Springfield",
//       email: "johndoe@example.com",
//       invoiceNumber: "INV-20250405-01",
//       date: "2025-04-05",
//       items: [
//         { description: "Website Design", quantity: 1, price: 500 },
//         { description: "Hosting (1 year)", quantity: 1, price: 100 },
//         { description: "Domain (1 year)", quantity: 1, price: 15 },
//       ],
//     },
//     {
//       id: "user2",
//       name: "Jane Smith",
//       address: "456 Elm St, Metropolis",
//       email: "janesmith@example.com",
//       invoiceNumber: "INV-20250405-02",
//       date: "2025-04-04",
//       items: [
//         { description: "App Development", quantity: 1, price: 1200 },
//         { description: "Maintenance", quantity: 6, price: 100 },
//       ],
//     },
//   ];

//   const [selectedUserId, setSelectedUserId] = useState(userInvoices[0].id);

//   const selectedUser = userInvoices.find((user) => user.id === selectedUserId);

//   const calculateTotal = () => {
//     return selectedUser.items.reduce(
//       (total, item) => total + item.quantity * item.price,
//       0
//     );
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="w-full bg-gray-100">
//       <Header />
//       <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//         {/* User selection label + select */}
//         <div className="sm:w-2/3 w-full">
//           <label className="block mb-1 font-medium text-gray-700">
//             Select User
//           </label>
//           <select
//             className="p-2 border border-gray-300 rounded"
//             value={selectedUserId}
//             onChange={(e) => setSelectedUserId(e.target.value)}
//           >
//             {userInvoices.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Print button */}
//         <div className="sm:w-auto w-full">
//           <button
//             onClick={handlePrint}
//             className="w-full sm:w-auto bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
//           >
//             Download / Print Invoice
//           </button>
//         </div>
//       </div>

//       {/* Invoice Section */}
//       <div className="bg-white p-6 rounded shadow-lg  mx-auto mt-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Invoice</h2>
//           <div>
//             <p>
//               <strong>Invoice #: </strong>
//               {selectedUser.invoiceNumber}
//             </p>
//             <p>
//               <strong>Date: </strong>
//               {selectedUser.date}
//             </p>
//           </div>
//         </div>

//         <div className="mb-4">
//           <h3 className="font-semibold">Billed To:</h3>
//           <p>{selectedUser.name}</p>
//           <p>{selectedUser.address}</p>
//           <p>{selectedUser.email}</p>
//         </div>

//         <table className="w-full table-auto border-collapse mb-4">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="p-2 border">Description</th>
//               <th className="p-2 border">Quantity</th>
//               <th className="p-2 border">Unit Price</th>
//               <th className="p-2 border">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedUser.items.map((item, index) => (
//               <tr key={index} className="border-t">
//                 <td className="p-2 border">{item.description}</td>
//                 <td className="p-2 border">{item.quantity}</td>
//                 <td className="p-2 border">${item.price.toFixed(2)}</td>
//                 <td className="p-2 border">
//                   ${(item.quantity * item.price).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="text-right">
//           <p className="text-xl font-semibold">
//             Total: ${calculateTotal().toFixed(2)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoice;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
import Header from "../components/header/Header";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const Invoice = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("Invoice"));
    dispatch(
      setBreadcrumbs([{ label: "Home", link: "/home" }, { label: "Invoice" }])
    );
  }, [dispatch]);

  // Sample user invoice list
  const userInvoices = [
    {
      id: "user1",
      name: "John Doe",
      address: "123 Main St, Springfield",
      email: "johndoe@example.com",
      invoiceNumber: "INV-20250405-01",
      date: "2025-04-05",
      items: [
        { description: "Website Design", quantity: 1, price: 500 },
        { description: "Hosting (1 year)", quantity: 1, price: 100 },
        { description: "Domain (1 year)", quantity: 1, price: 15 },
      ],
    },
    {
      id: "user2",
      name: "Jane Smith",
      address: "456 Elm St, Metropolis",
      email: "janesmith@example.com",
      invoiceNumber: "INV-20250405-02",
      date: "2025-04-04",
      items: [
        { description: "App Development", quantity: 1, price: 1200 },
        { description: "Maintenance", quantity: 6, price: 100 },
      ],
    },
  ];

  const [selectedUserId, setSelectedUserId] = useState(userInvoices[0].id);

  const selectedUser = userInvoices.find((user) => user.id === selectedUserId);

  const calculateTotal = () => {
    return selectedUser.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async (type) => {
    if (type === "pdf") {
      const invoiceElement = document.querySelector("#invoice-content");
      const canvas = await html2canvas(invoiceElement);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${selectedUser.invoiceNumber}.pdf`);
    } else if (type === "csv") {
      const rows = [
        ["Description", "Quantity", "Unit Price", "Amount"],
        ...selectedUser.items.map((item) => [
          item.description,
          item.quantity,
          item.price,
          item.quantity * item.price,
        ]),
        ["", "", "Total", calculateTotal()],
      ];

      const csvContent = rows
        .map((e) => e.map((v) => `"${v}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${selectedUser.invoiceNumber}.csv`);
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header />
      <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 px-4">
        {/* User selection label + select */}
        <div className="">
          <label className="block mb-1 font-medium text-gray-700">
            Select User
          </label>
          <select
            className="p-2 border border-gray-300 rounded w-full"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            {userInvoices.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Print and download dropdown */}
        <div className="sm:w-auto w-full flex flex-col sm:flex-row gap-2">
          {/* <button
            onClick={handlePrint}
            className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
          >
            Print Invoice
          </button> */}

          <select
            onChange={(e) => handleDownload(e.target.value)}
            className="bg-white border border-gray-300 rounded px-4 py-2 text-gray-700"
            defaultValue=""
          >
            <option value="" disabled>
              Download As
            </option>
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
          </select>
        </div>
      </div>

      {/* Invoice Section */}
      <div
        id="invoice-content"
        className="bg-white p-6 rounded shadow-lg mx-4 mt-6 print:mx-auto print:shadow-none print:border print:border-gray-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Invoice</h2>
          <div>
            <p>
              <strong>Invoice #: </strong>
              {selectedUser.invoiceNumber}
            </p>
            <p>
              <strong>Date: </strong>
              {selectedUser.date}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Billed To:</h3>
          <p>{selectedUser.name}</p>
          <p>{selectedUser.address}</p>
          <p>{selectedUser.email}</p>
        </div>

        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Unit Price</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedUser.items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 border">{item.description}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">${item.price.toFixed(2)}</td>
                <td className="p-2 border">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <p className="text-xl font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

