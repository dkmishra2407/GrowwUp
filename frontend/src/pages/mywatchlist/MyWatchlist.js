// import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';
// import Loading from '../../components/loading/Loading';
// import { Button } from '@mui/material';

// function createData(name, open, price, upperCP, pChange, change, basePrice, vwap, lastPrice) {
//   return { name, open, price, upperCP, pChange, change, basePrice, vwap, lastPrice };
// }

// export default function MyWatchlist({ status, refresh, setRefresh }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getOrders = async () => {
//     // const userId = JSON.parse(localStorage.getItem('cmUser')).userid;
//     const userId = "naBsR0p2vW";
//     setLoading(true);
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/watchlist/get?userId=${userId}&status=${status}`);
//       if (response.status === 200) {
//         setLoading(false);
//         const allOrders = response.data.watching_stocks.map((stock) =>
//           createData(stock.name, stock.open, stock.lastPrice, stock.upperCP, stock.pChange, stock.change, stock.basePrice, stock.vwap, stock.lastPrice)
//         );
//         setOrders(allOrders);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Something went wrong");
//     }
//   };

//   const handleBuy = async (order, action) => {
//     const user_quantity = prompt("ENTER THE QUANTITY");

//       if (user_quantity !== null && !isNaN(user_quantity) && user_quantity.trim() !== "") {
//         const sellData = {
//           symbol: order.symbol,
//           orderType: 'Buy',
//           priceType: 'market',
//           productType: 'Delivery',
//           qty: parseInt(user_quantity),
//           price: order.price, // Use order.price instead of price
//           userId: 'naBsR0p2vW', // Replace with actual user ID
//           stockPrice: order.price, // Use order.price instead of price
//         };
//         try {
//           const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/stock/buy`, sellData);
  
//           if (response.data.success) {
//             // alert(response.data.data.message);
//             alert(`Buy Placed Successfully`);
//           } else {
//             alert(`Failed to place Buy order`);
//           }
//         } catch (error) {
//           console.error('Error selling stock:', error.message);
//           alert('Error selling stock. Please try again.');
//         }
//       } else {
//         alert("Please enter a valid quantity.");
//       }
//     }
//   };

  

//   useEffect(() => {
//     getOrders();
//   }, [status, refresh]);

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Open Price</TableCell>
//             <TableCell align="right">Last Price</TableCell>
//             <TableCell align="right">Upper Circuit</TableCell>
//             <TableCell align="right">Change (%)</TableCell>
//             <TableCell align="right">Change</TableCell>
//             <TableCell align="right">Base Price</TableCell>
//             <TableCell align="right">VWAP</TableCell>
//             <TableCell align="right">Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {loading ? (
//             <Loading />
//           ) : orders.length > 0 ? (
//             orders.map((order, index) => (
//               <TableRow key={index}>
//                 <TableCell>{order.name}</TableCell>
//                 <TableCell>{order.open}</TableCell>
//                 <TableCell align="right">{order.price}</TableCell>
//                 <TableCell align="right">{order.upperCP}</TableCell>
//                 <TableCell align="right" style={{ color: order.pChange > 0 ? 'green' : order.pChange < 0 ? 'red' : 'inherit' }}>
//                         {(order.pChange).toFixed(3)}
//                       </TableCell>
//                       <TableCell align="right" style={{ color: order.change > 0 ? 'green' : order.change < 0 ? 'red' : 'inherit' }}>
//                         {(order.change).toFixed(3)}
//                       </TableCell>
//                 <TableCell align="right">{order.basePrice}</TableCell>
//                 <TableCell align="right">{order.vwap}</TableCell>
//                 <TableCell>
//                   <Button onClick = {() => handleBuy(order)} style={{ color: 'white', backgroundColor: '#D43725', margin: '3.5px' }}>Buy</Button>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={9} align="center">
//                 No stocks in watchlist
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
import Loading from '../../components/loading/Loading';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(name, open, price, upperCP, pChange, change, basePrice, vwap, max, min) {
  return { name, open, price, upperCP, pChange, change, basePrice, vwap, max, min };
}

export default function MyWatchlist({ status, refresh, setRefresh }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    const userId = JSON.parse(localStorage.getItem('cmUser')).myuserid;
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/watchlist/get?userId=${userId}&status=${status}`);
      if (response.status === 200) {
        setLoading(false);
        const allOrders = response.data.watching_stocks.map((stock) =>
          createData(stock.name, stock.open, stock.lastPrice, stock.upperCP, stock.pChange, stock.change, stock.basePrice, stock.vwap, stock.max, stock.min)
        );
        setOrders(allOrders);
      }
    } catch (err) {
      console.log(err);
      alert('Something went wrong');
    }
  };

  const handleBuy = async (order) => {
    const userQuantity = prompt('ENTER THE QUANTITY');

    if (userQuantity !== null && !isNaN(userQuantity) && userQuantity.trim() !== '') {
      const buyData = {
        symbol: order.name,
        orderType: 'Buy',
        priceType: 'market',
        productType: 'Delivery',
        qty: parseInt(userQuantity),
        price: order.price,
        userId: JSON.parse(localStorage.getItem('cmUser')).myuserid,
        stockPrice: order.price,
      };
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/stock/buy`, buyData);

        if (response.data.success) {
          alert('Buy Placed Successfully');
        } else {
          alert('Failed to place Buy order');
        }
      } catch (error) {
        console.error('Error buying stock:', error.message);
        alert('Error buying stock. Please try again.');
      }
    } else {
      alert('Please enter a valid quantity.');
    }
  };

  const handleDeleteWatchlist = async (order) => {
    const deletingName = order.name;
    const userId = JSON.parse(localStorage.getItem('cmUser')).myuserid;
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/stock/remove?userId=${userId}&deletingName=${deletingName}`);
      if (response.status === 200) {
        alert('Deleted From Watchlist');
      } else {
        alert('Failed to Delete from Watchlist');
      }
    } catch (err) {
      console.error(err);
      alert('Error Deleting From Watchlist');
    }
  };

  useEffect(() => {
    getOrders();
  }, [status, refresh]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Open Price</TableCell>
            <TableCell align="right">Last Price</TableCell>
            <TableCell align="right">Upper Circuit</TableCell>
            <TableCell align="right">Change (%)</TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">Base Price</TableCell>
            <TableCell align="right">VWAP</TableCell>
            <TableCell align="right">Max</TableCell>
            <TableCell align="right">Min</TableCell>
            <TableCell align="right">Buy</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <Loading />
          ) : orders.length > 0 ? (
            orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.open}</TableCell>
                <TableCell align="right">{order.price}</TableCell>
                <TableCell align="right">{order.upperCP}</TableCell>
                <TableCell align="right" style={{ color: order.pChange > 0 ? 'green' : order.pChange < 0 ? 'red' : 'inherit' }}>
                  {(order.pChange).toFixed(3)}
                </TableCell>
                <TableCell align="right" style={{ color: order.change > 0 ? 'green' : order.change < 0 ? 'red' : 'inherit' }}>
                  {(order.change).toFixed(3)}
                </TableCell>
                <TableCell align="right">{order.basePrice}</TableCell>
                <TableCell align="right">{order.vwap}</TableCell>
                <TableCell align="right">{order.max}</TableCell>
                <TableCell align="right">{order.min}</TableCell>
                <TableCell>
                  <Button onClick={() => handleBuy(order)} style={{ color: 'white', backgroundColor: '#D43725', margin: '3.5px' }}>Buy</Button>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteWatchlist(order)}></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No stocks in watchlist
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


// import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';
// import Loading from '../../components/loading/Loading';
// import { Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';


// function createData( name, open, price, upperCP, pChange, change, basePrice, vwap, lastPrice,max,min) {
//   return {  name, open, price, upperCP, pChange, change, basePrice, vwap, lastPrice , max, min };
// }

// export default function MyWatchlist({ status, refresh, setRefresh }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getOrders = async () => {
//     userId = JSON.parse(localStorage.getItem('cmUser')).myuserid
//     setLoading(true);
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/watchlist/get?userId=${userId}&status=${status}`);
//       if (response.status === 200) {
//         setLoading(false);
//         const allOrders = response.data.watching_stocks.map((stock) =>
//           createData( stock.name, stock.open, stock.lastPrice, stock.upperCP, stock.pChange, stock.change, stock.basePrice, stock.vwap, stock.lastPrice,stock.max,stock.min)
//         );
//         setOrders(allOrders);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Something went wrong");
//     }
//   };

//   const handleBuy = async (order) => {
    
//     const user_quantity = prompt("ENTER THE QUANTITY");

//     if (user_quantity !== null && !isNaN(user_quantity) && user_quantity.trim() !== "") {
//       const buyData = {
//         symbol: order.name,
//         orderType: 'Buy',
//         priceType: 'market',
//         productType: 'Delivery',
//         qty: parseInt(user_quantity),
//         price: order.price,
//         userId = JSON.parse(localStorage.getItem('cmUser')).myuserid,
//         stockPrice: order.price,
//       };
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/stock/buy`, buyData);

//         if (response.data.success) {
//           alert(`Buy Placed Successfully`);
//         } else {
//           alert(`Failed to place Buy order`); 
//         }
//       } catch (error) {
//         console.error('Error buying stock:', error.message);
//         alert('Error buying stock. Please try again.');
//       }
//     } else {
//       alert("Please enter a valid quantity.");
//     }
//   };

//   const handledeletewatchlist = async (order) => {
//     const deleteByName = order.name; // Corrected variable name

//     console.log(deleteByName);
//     try {
//         const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/watchlist/remove?deleting_name=${deleteByName}`);
        
//         if (response.status === 200) {
//             alert('Deleted From Watchlist');
//         } else {
//             alert('Failed to Delete from Watchlist');
//         }
//     } catch (err) {
//         console.error(err);
//         alert('Error Deleting From Watchlist');
//     }
// };


//   useEffect(() => {
//     getOrders();
//   }, [status, refresh]);

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Open Price</TableCell>
//             <TableCell align="right">Last Price</TableCell>
//             <TableCell align="right">Upper Circuit</TableCell>
//             <TableCell align="right">Change (%)</TableCell>
//             <TableCell align="right">Change</TableCell>
//             <TableCell align="right">Base Price</TableCell>
//             <TableCell align="right">VWAP</TableCell>
//             <TableCell align="right">Max</TableCell>
//             <TableCell align="right">Min</TableCell>
//             <TableCell align="right">Buy</TableCell>
//             <TableCell align="right">Delete</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {loading ? (
//             <Loading />
//           ) : orders.length > 0 ? (
//             orders.map((order, index) => (
//               <TableRow key={index}>
//                 <TableCell>{order.name}</TableCell>
//                 <TableCell>{order.open}</TableCell>
//                 <TableCell align="right">{order.price}</TableCell>
//                 <TableCell align="right">{order.upperCP}</TableCell>
//                 <TableCell align="right" style={{ color: order.pChange > 0 ? 'green' : order.pChange < 0 ? 'red' : 'inherit' }}>
//                   {(order.pChange).toFixed(3)}
//                 </TableCell>
//                 <TableCell align="right" style={{ color: order.change > 0 ? 'green' : order.change < 0 ? 'red' : 'inherit' }}>
//                   {(order.change).toFixed(3)}
//                 </TableCell>
//                 <TableCell align="right">{order.basePrice}</TableCell>
//                 <TableCell align="right">{order.vwap}</TableCell>
//                 <TableCell align="right">{order.max}</TableCell>
//                 <TableCell align="right">{order.min}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleBuy(order)} style={{ color: 'white', backgroundColor: '#D43725', margin: '3.5px' }}>Buy</Button>
//                 </TableCell>
//               <TableCell>  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handledeletewatchlist(order)}  > </Button></div></TableCell>
//               </TableRow>
//             ))

//           ) : (
//             <TableRow>
//               <TableCell colSpan={9} align="center">
//                 No stocks in watchlist
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
