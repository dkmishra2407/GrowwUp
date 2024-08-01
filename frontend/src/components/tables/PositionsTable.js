// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

// function createData(qty, price, symbol) {
//   return { qty, price, symbol };
// }

// const userId = JSON.parse(localStorage.getItem('cmUser')).myuserid;
// console.log(userId);

// const status = 'filled'; // Assuming status is defined somewhere in your code

// const PositionsTable = () => {
//   const [allOrders, setOrders] = useState([]);

//   const getPositions = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/all?userId=${userId}&status=${status}`);
//       if (response.status === 200) {
//         const allOrdersData = response.data.orders.map((order) =>
//           createData(order.qty, order.price, order.symbol)
//         );
//         setOrders(allOrdersData);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Something went wrong");
//     }
//   };

//   useEffect(() => {
//     getPositions();
//   }, []); // Empty dependency array to run effect only once

//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Stock Name</TableCell>
//           <TableCell>Total Quantity</TableCell>
//           <TableCell>Average Price</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {allOrders.map((position, index) => (
//           <TableRow key={index}>
//             <TableCell>{position.symbol}</TableCell>
//             <TableCell>{position.qty}</TableCell>
//             <TableCell>{position.price}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default PositionsTable;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function createData(qty, price, symbol) {
  return { qty, price, symbol };
}

const PositionsTable = () => {
  const [allOrders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null); // Initialize userId state
  const status = 'filled'; // Assuming status is defined somewhere in your code

  useEffect(() => {
    // Retrieve userId safely from localStorage
    const userData = localStorage.getItem('cmUser');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserId(parsedData.myuserid); // Set userId state
    } else {
      console.error("User data not found in localStorage.");
      alert("User not logged in. Please log in to view your positions.");
    }
  }, []); // Run once on component mount

  const getPositions = async () => {
    if (!userId) return; // Prevent API call if userId is not available

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/all?userId=${userId}&status=${status}`);
      if (response.status === 200) {
        const allOrdersData = response.data.orders.map((order) =>
          createData(order.qty, order.price, order.symbol)
        );
        setOrders(allOrdersData);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // Call getPositions when userId is set
  useEffect(() => {
    if (userId) {
      getPositions();
    }
  }, [userId]); // Dependency on userId

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Stock Name</TableCell>
          <TableCell>Total Quantity</TableCell>
          <TableCell>Average Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allOrders.map((position, index) => (
          <TableRow key={index}>
            <TableCell>{position.symbol}</TableCell>
            <TableCell>{position.qty}</TableCell>
            <TableCell>{position.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PositionsTable;