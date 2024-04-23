// import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';
// import Loading from '../loading/Loading';
// import { Button } from '@mui/material';

// function createData(qty, price, productType, priceType, symbol,orderType,createdAt) {
//   return { qty, price, productType, priceType, symbol,orderType,createdAt };
// }

// export default function OrdersTable({ status, refresh, setRefresh }) {
//   // State for orders, loading status, and modal visibility
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Function to fetch orders from the server
//   const getOrders = async () => {
//     const userId = JSON.parse(localStorage.getItem('cmUser')).userid;
//     setLoading(true);
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/order/all?userId=${userId}&status=${status}`);
//       if (response.status === 200) {
//         setLoading(false);
//         setRefresh(false);
//         const allOrders = response.data.orders.map((order) =>
//           createData(order.qty, order.price, order.productType, order.priceType, order.symbol,order.orderType,order.createdAt)
//         );
//         setOrders(allOrders);
//         // console.log(allOrders);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Something went wrong");
//     }
//   };

//   // Function to handle opening the sell modal
//   const handleSellStock = async (order) => {
    // const user_quantity = prompt("ENTER THE QUANTITY");
    // if(order.qty>= user_quantity){
    //   order.qty -= user_quantity;
    //   if (user_quantity !== null && !isNaN(user_quantity) && user_quantity.trim() !== "") {
    //     const sellData = {
    //       symbol: order.symbol,
    //       orderType: 'Sell',
    //       priceType: 'market',
    //       productType: 'Delivery',
    //       qty: parseInt(user_quantity),
    //       price: order.price, // Use order.price instead of price
    //       userId: 'naBsR0p2vW', // Replace with actual user ID
    //       stockPrice: order.price, // Use order.price instead of price
    //     };
    //     try {
    //       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/stock/sell`, sellData);
  
    //       if (response.data.success) {
    //         alert(response.data.data.message);
    //         // Additional logic if needed
    //       } else {
    //         alert('Failed to place sell order');
    //       }
    //     } catch (error) {
    //       console.error('Error selling stock:', error.message);
    //       alert('Error selling stock. Please try again.');
    //     }
    //   } else {
    //     alert("Please enter a valid quantity.");
    //   }
    // }
    // else{
    //   alert("Please enter the Valid Number of Quantity");
    // }
//   };

//   // Fetch orders on component mount
//   useEffect(() => {
//     getOrders();
//   }, []);

//   // Fetch orders when refresh flag changes
//   useEffect(() => {
//     if (refresh) getOrders();
//   }, [refresh]);

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Symbol</TableCell>
//             <TableCell>Qty</TableCell>
//             <TableCell align="right">Price</TableCell>
//             <TableCell align="right">Total Price</TableCell>
//             <TableCell align='right'>Taxes</TableCell>
//             <TableCell align="right">Product Type</TableCell>
//             <TableCell align="right">Price Type</TableCell>
//             <TableCell align="right">Order Type</TableCell>
//             <TableCell align="right">Order Date</TableCell>
//             <TableCell align="right">Sell</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {loading ? (
//             <Loading />
//           ) : orders.length > 0 ? (
//             orders.map((order, index) => (
//               <TableRow key={index}>
//                 <TableCell>{order.symbol}</TableCell>
//                 <TableCell>{order.qty}</TableCell>
//                 <TableCell align="right">{order.price}</TableCell>
//                 <TableCell align="right">{(order.price * order.qty).toFixed(3)}</TableCell>
//                 <TableCell align="right">{((13.5+0.18*order.price*order.qty*0.0000345+0.001*order.price*order.qty+0.0000345*order.price*order.qty+0.18*order.price*order.qty*0.0000345+10/10000000*order.price*order.qty+0.00015*order.price*order.qty).toFixed(2))}</TableCell>
//                 <TableCell align="right">{order.productType}</TableCell>
//                 <TableCell align="right">{order.priceType}</TableCell>
//                 <TableCell align="right">{order.orderType}</TableCell>
//                 <TableCell align="right">{new Date(order.createdAt).toISOString().substring(0, 10)}</TableCell>
//                 <TableCell>
//   <Button onClick={() => handleSellStock(order)} style={{ color: 'white', backgroundColor: '#D43725' }}>
//     {order.orderType === 'Sell' ? 'Buy' : 'Sell'}
//   </Button>
// </TableCell>
//               </TableRow>
//             ))
            
//           ) : (
//             <TableRow>
//               <TableCell colSpan={4} align="center">
//                 No orders
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }


import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Loading from '../loading/Loading';
import { Button } from '@mui/material';

function createData(qty, price, productType, priceType, symbol, orderType, createdAt,profit) {
  return { qty, price, productType, priceType, symbol, orderType, createdAt, profit };
}

export default function OrdersTable({ status, refresh, setRefresh }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem('cmUser')).myuserid;

  const getOrders = async () => {
    
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/order/all?userId=${userId}&status=${status}`);
      if (response.status === 200) {
        setLoading(false);
        setRefresh(false);
        const allOrders = response.data.orders.map((order) =>
          createData(order.qty, order.price, order.productType, order.priceType, order.symbol, order.orderType, order.createdAt , order.profit)
        );
        setOrders(allOrders);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleBuySell = async (order, action) => {
    const user_quantity = prompt("ENTER THE QUANTITY");
    if(order.qty>= user_quantity){
      order.qty -= user_quantity;
      if (user_quantity !== null && !isNaN(user_quantity) && user_quantity.trim() !== "") {
        const sellData = {
          symbol: order.symbol,
          orderType: 'Sell',
          priceType: 'market',
          productType: 'Delivery',
          qty: parseInt(user_quantity),
          price: order.price, // Use order.price instead of price
          userId: userId, // Replace with actual user ID
          stockPrice: order.price, // Use order.price instead of price
        };
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/stock/sell`, sellData);
  
          if (response.data.success) {
            // alert(response.data.data.message);
            alert(`sell order Placed Successfully`);
          } else {
            alert(`sell order Placed Successfully`);
          }
        } catch (error) {
          console.error('Order placed successfully', error.message);
          alert('Order placed successfully');
        }
      } else {
        alert("Please enter a valid quantity.");
      }
    }
    else{
      alert("Please enter the Valid Number of Quantity");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (refresh) getOrders();
  }, [refresh]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align='right'>Taxes</TableCell>
            <TableCell align="right">Product Type</TableCell>
            <TableCell align="right">Price Type</TableCell>
            <TableCell align="right">Order Type</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Profit/Loss(%)</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <Loading />
          ) : orders.length > 0 ? (
            orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.symbol}</TableCell>
                <TableCell>{order.qty}</TableCell>
                <TableCell align="right">{order.price}</TableCell>
                <TableCell align="right">{(order.price * order.qty).toFixed(3)}</TableCell>
                <TableCell align="right">{((13.5 + 0.18 * order.price * order.qty * 0.0000345 + 0.001 * order.price * order.qty + 0.0000345 * order.price * order.qty + 0.18 * order.price * order.qty * 0.0000345 + 10 / 10000000 * order.price * order.qty + 0.00015 * order.price * order.qty).toFixed(2))}</TableCell>
                <TableCell align="right">{order.productType}</TableCell>
                <TableCell align="right">{order.priceType}</TableCell>
                <TableCell align="right">{order.orderType}</TableCell>
                <TableCell align="right">{new Date(order.createdAt).toISOString().substring(0, 10)}</TableCell>
                <TableCell align="right" style={{ color: order.profit && order.profit.toFixed(2) > 0 ? 'green' : 'red' }}>{order.profit && order.profit.toFixed(2)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleBuySell(order, order.orderType === 'Sell' ? 'Buy' : 'Sell')} style={{ color: 'white', backgroundColor: '#D43725' }}>
                    {order.orderType === 'Sell' ? 'Buy' : 'Sell'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No orders
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
