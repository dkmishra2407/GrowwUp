// import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
// import React, { useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import { useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import axios from 'axios';
// // import DataService from '../../services/DataService';
// import DeleteIcon from '@mui/icons-material/Delete';
// import InsertChartIcon from '@mui/icons-material/InsertChart';

// import { useNavigate } from 'react-router-dom';
// import Loading from '../loading/Loading';

// let BASE_URL = "http://localhost:5000/api";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: '1rem 0.2rem',
//     textAlign: 'left',
//     color: theme.palette.text.secondary,
//     boxShadow: 'none',
//     borderBottom: '1px solid #B0A8B9',
//     borderRadius: '0px   '
// }));

// function Watchlist() {

//     const [inputStock, setInputStock] = useState('');
//     const [stocks, setStocks] = useState([]);
//     const [userWatchlist, setUserWatchlist] = useState([]);
//     const [hoverIndex, setHoverIndex] = useState(false);
//     const [userId, setUserId] = useState('');
//     const [open, setOpen] = useState(false);
//     const [stock, setStock] = useState({});
//     const [orderType, setOrderType] = useState('');
//     const [loadingId, setLoadingId] = useState('');

//     const navigate = useNavigate();

//     const handleSearchStock = async () => {

//         try {
//             const response = await fetch(`http://127.0.0.1:8000/${inputStock}`);
//             if (response.status === 200) {
//                 const responseData = await response.json();
//                 setStocks(responseData);
//                 console.log(responseData);
//             }
//         } catch (err) {
//             console.log(err);
//             alert("Internal server error");
//         }
//     }

//     const handleAddStockToWatchlist = async (stock) => {
//         const data = {
//             userId: userId,
//             scriptId: stock._id
//         }
//         try {
//             setLoadingId(stock._id);
//             const response = await axios.post(`${BASE_URL}/watchlist/add`, data);
//             if (response.status === 200) {
//                 getUserWatchlist();
//                 setInputStock('');
//                 setLoadingId('');
//                 setStocks([]);
//                 alert('Added to watchlist');
//             }
//         } catch (err) {
//             console.log(err);
//             setLoadingId('');
//             alert(err.response.data.message);
//         }
//     }

//     const handleRemoveStockToWatchlist = async (watchlistStockId) => {
//         try {
//             const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/watchlist/remove?watchlistScripId=${watchlistStockId}`);
//             if (response.status === 200) {
//                 getUserWatchlist();
//                 alert('Removed')
//             }
//         } catch (err) {
//             console.log(err);
//             alert('Something went wrong');
//         }
//     }

//     const getUserWatchlist = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/watchlist/get?userId=${userId}`);
//             if (response.status === 200) {
//                 setUserWatchlist(response.data.data);
//             }
//         } catch (err) {
//             console.log(err);
//             alert("Internal server error");
//         }
//     }

//     const handleBuySellStock = (stock, type) => {
//         console.log(type);
//         setOpen(true);
//         setOrderType(type)
//         setStock(stock);
//     };

//     const handleShowChart = (stock) => {
//         navigate(`/chart?symbol=${stock.scriptId.originalName}`);
//     }

//     useEffect(() => {
//         setUserId(JSON.parse(localStorage.getItem('cmUser'))?.userid);
//         if (userId) getUserWatchlist();
//     }, [userId]);

//     useEffect(() => {

//         if (userId) {

//             const ws = new WebSocket('ws://localhost:5000');

//             const DataService = {
//                 "ws": (userId) => {
//                     ws.onopen = () => {
//                         console.log("Connected to websocket!!", userId);
//                         ws.send(JSON.stringify({
//                             userId: userId
//                         }));
//                     }
//                     ws.onclose = () => {
//                         console.log("Connection closed!!");
//                     }
//                     return ws;
//                 }
//             }

//             DataService.ws(userId).onmessage = (ev) => {
//                 let watchlistData = JSON.parse(ev.data);
//                 // console.log(watchlistData.scrips);
//                 if (watchlistData.scrips.length > 0) setUserWatchlist(watchlistData.scrips);
//             }
//         }

//     }, [userId]);

//     return (
//         <Box sx={{ width: '100%', height: '600px' }}>
//             <BuySellModal
//                 open={open}
//                 setOpen={setOpen}
//                 orderType={orderType}
//                 stock={stock} />
//             <Box>
//                 <Stack direction="row" spacing={1} >
//                     <TextField
//                         sx={{
//                             width: '80%'
//                         }}
//                         value={inputStock}
//                         onChange={(e) => setInputStock(e.target.value.toUpperCase())}
//                         color="secondary"
//                         id="outlined-basic"
//                         label="Search stock"
//                         variant="outlined" />
//                     <Button onClick={handleSearchStock} sx={{
//                         color: '#fff',
//                         background: '#D43725',
//                         fontSize: '0.9rem!important',
//                         padding: '0.5rem 2rem',
//                         '&:hover': {
//                             background: '#D43725',
//                             opacity: 0.8
//                         }
//                     }} >Search</Button>
//                 </Stack>
//             </Box>
//             <Box sx={{
//                 overflowY: 'auto',
//                 height: '530px',
//                 margin: '1rem 0rem'
//             }} >
//                 {
//                     inputStock && stocks.length > 0 ?
//                         <Stack>
//                             {
//                                 stocks ?
//                                     stocks.map((stock) => {
//                                         return (
//                                             <Item key={stock._id} >
//                                                 <Stack direction="row" alignItems="center" justifyContent="space-between" >
//                                                     <Typography sx={{ color: '#000' }} >{stock.symbol}</Typography>
//                                                     {
//                                                         loadingId === stock._id ?
//                                                         <Loading /> :
//                                                         <AddIcon
//                                                         onClick={() => handleAddStockToWatchlist(stock)}
//                                                         sx={{
//                                                             '&:hover': {
//                                                                 cursor: 'pointer'
//                                                             }
//                                                         }} /> 
//                                                     }
//                                                 </Stack>
//                                             </Item>
//                                         )
//                                     }) : <Typography>No Stocks found.</Typography>
//                             }
//                         </Stack>
//                         : <Stack>
//                             {
//                                 userWatchlist.length > 0 ?
//                                     userWatchlist.map((stock) => {
//                                         return (
//                                             <Item
//                                                 key={stock._id} >
//                                                 <Grid container spacing={2}
//                                                     onMouseOver={() => setHoverIndex(stock._id)}
//                                                     onMouseLeave={() => setHoverIndex(-1)} >
//                                                     <Grid item xs={8}>
//                                                         <Typography>{stock.scriptId.symbol}</Typography>
//                                                     </Grid>
//                                                     <Grid item xs={4}>
//                                                         {
//                                                             hoverIndex === stock._id ?
//                                                                 <Stack
//                                                                     direction="row"
//                                                                     alignItems="center"
//                                                                     spacing={2}
//                                                                 >
//                                                                     <Stack
//                                                                         justifyContent="center"
//                                                                         alignItems="center"
//                                                                         sx={{
//                                                                             background: "#1976d2",
//                                                                             width: '22px',
//                                                                             height: '22px',
//                                                                             color: '#fff',
//                                                                             borderRadius: '2px',
//                                                                             cursor: 'pointer',
//                                                                             boxShadow: '0px 0px 3px 2px #bddfc3'
//                                                                         }} >
//                                                                         <Typography
//                                                                             onClick={() => handleBuySellStock(stock, 'Buy')}
//                                                                             sx={{
//                                                                                 fontSize: '0.9rem'
//                                                                             }} >B</Typography>
//                                                                     </Stack>
//                                                                     <Stack justifyContent="center"
//                                                                         alignItems="center"
//                                                                         sx={{
//                                                                             background: "#d43725",
//                                                                             width: '22px',
//                                                                             height: '22px',
//                                                                             color: '#fff',
//                                                                             borderRadius: '2px',
//                                                                             cursor: 'pointer',
//                                                                             boxShadow: '0px 0px 3px 2px #bddfc3'
//                                                                         }} >
//                                                                         <Typography
//                                                                             onClick={() => handleBuySellStock(stock, 'Sell')}
//                                                                             sx={{
//                                                                                 fontSize: '0.9rem'
//                                                                             }} >S</Typography>
//                                                                     </Stack>
//                                                                     <Stack sx={{
//                                                                         background: "#fff",
//                                                                         cursor: 'pointer',
//                                                                         boxShadow: '0px 0px 3px 2px #bddfc3'
//                                                                     }} >
//                                                                         <DeleteIcon onClick={() => handleRemoveStockToWatchlist(stock._id)} />
//                                                                     </Stack>
//                                                                     <Stack sx={{
//                                                                         background: "#fff",
//                                                                         cursor: 'pointer',
//                                                                         boxShadow: '0px 0px 3px 2px #bddfc3'
//                                                                     }} >
//                                                                         <InsertChartIcon onClick={() => handleShowChart(stock)} />
//                                                                     </Stack>
//                                                                 </Stack> :
//                                                                 <Stack
//                                                                     direction="row"
//                                                                     alignItems="center"
//                                                                     justifyContent="space-between"
//                                                                     spacing={2}
//                                                                 >
//                                                                     <Typography sx={{
//                                                                         color: parseFloat(stock.scriptId.pChange) > 0 ? '#0ee07b' : '#f64d41'
//                                                                     }} >{stock.scriptId.pChange ? stock.scriptId.pChange : 0}%</Typography>
//                                                                     <Typography>{stock.scriptId.lastPrice ? stock.scriptId.lastPrice : 0}</Typography>
//                                                                 </Stack>
//                                                         }
//                                                     </Grid>
//                                                 </Grid>
//                                             </Item>
//                                         )
//                                     }) :
//                                     <Typography>No stocks in watchlist.</Typography>
//                             }
//                         </Stack>
//                 }
//             </Box>
//         </Box>
//     )
// }

// export default Watchlist;


// import React, { useState, useEffect } from 'react';
// import { Box, Button, Stack, TextField } from '@mui/material';
// import BuySellModal from '../modals/BuySellModal'; // Import the BuySellModal component
// import axios from 'axios';

// function Watchlist() {
//   const [inputStock, setInputStock] = useState('');
//   const [stocks, setStocks] = useState([]);
//   const [openBuyModal, setOpenBuyModal] = useState(false);

//   const handleBuyStock = () => {
//     setOpenBuyModal(true); // Open BuySellModal for buying
//   };

//   const handleAddToWatchlist = () => {
//     alert("Added to Watchlist");
//   };

//   const handleSearchStock = async () => {
//     //try {
//     //   const response = await axios.get(`http://127.0.0.1:8000/${inputStock}`);
//     //   if (response.status === 200) {
//     //     setStocks(response.data);
//     //     setStocks("name" = {inputStock});
//     //   }
//     // } catch (err) {
//     //   console.log(err);
//     //   alert("Internal server error");
//     // }
//     const response = await axios.get(`http://127.0.0.1:8000/${inputStock}`);
// try {
//   if (response.status === 200) {
//     const stockData = { name: inputStock, data: response.data };
//     setStocks(stockData);
//   }
// } catch (err) {
//   console.log(err);
//   alert("Internal server error");
// }

//   };

//   useEffect(() => {
//     handleSearchStock(); // Trigger search on component mount (you might want to adjust this logic)

//     return () => {
//       setOpenBuyModal(false); // Reset the modal state on component unmount
//     };
//   }, []); // Empty dependency array means this effect runs only once on mount

//   return (
//     <Box sx={{ width: '100%', height: '600px' }}>
//       {/* Render BuySellModal for buying action */}
//       {openBuyModal && (
//         <BuySellModal
//           type="BUY"
//           onClose={() => setOpenBuyModal(false)}
//           message = {stocks} // Close BuySellModal for buying
//         />
//       )}

//       <Stack direction="row" spacing={1}>
//         <TextField
//           sx={{ width: '80%' }}
//           value={inputStock}
//           onChange={(e) => setInputStock(e.target.value.toUpperCase())}
//           color="secondary"
//           id="outlined-basic"
//           label="Search stock"
//           variant="outlined"
//         />
//         <Button
//           onClick={handleSearchStock}
//           sx={{
//             color: '#fff',
//             background: '#D43725',
//             fontSize: '0.9rem!important',
//             padding: '0.5rem 2rem',
//             '&:hover': {
//               background: '#D43725',
//               opacity: 0.8,
//             },
//           }}
//         >
//           Search
//         </Button>
//       </Stack>

//       {/* Render stocks list */}
//       <Box
//         sx={{
//           overflowY: 'auto',
//           height: '530px',
//           margin: '1rem 0rem',
//         }}
//       >
//         <pre>{JSON.stringify(stocks, null, 2)}</pre>
//       </Box>

//       {/* Action buttons */}
//       <Button
//         onClick={handleBuyStock}
//         sx={{
//           color: '#fff',
//           margin: '10px',
//           background: '#D43725',
//           fontSize: '0.9rem!important',
//           padding: '0.5rem 2rem',
//           '&:hover': {
//             background: '#D43725',
//             opacity: 0.8,
//           },
//         }}
//       >
//         BUY
//       </Button>

//       <Button
//         onClick={handleAddToWatchlist}
//         sx={{
//           color: '#fff',
//           margin: '10px',
//           background: '#D43725',
//           fontSize: '0.9rem!important',
//           padding: '0.5rem 2rem',
//           '&:hover': {
//             background: '#D43725',
//             opacity: 0.8,
//           },
//         }}
//       >
//         Add To Watchlist
//       </Button>
//     </Box>
//   );
// }

// export default Watchlist;


// import React, { useState, useEffect } from 'react';
// import { Box, Button, Stack, TextField } from '@mui/material';
// import BuySellModal from '../modals/BuySellModal'; // Import the BuySellModal component
// import axios from 'axios';

// function Watchlist() {
//   const [inputStock, setInputStock] = useState('');
//   const [stocks, setStocks] = useState([]);
//   const [openBuyModal, setOpenBuyModal] = useState(false);

//   const handleBuyStock = () => {
//     setOpenBuyModal(true); // Open BuySellModal for buying
//   };

//   const handleAddToWatchlist = async () => {
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/watchlist/add`, {stocks});
//         if (response.status === 200) {
//           alert('Added to Watchlist');
//         } else {
//           alert('Failed to add to Watchlist');
//         }
//       } catch (err) {
//         console.error(err);
//         alert('Error adding to Watchlist');
//       }
//   };

//   const handleSearchStock = async () => {
//     const response = await axios.get(`http://127.0.0.1:8000/${inputStock}`);
//     try {
//       if (response.status === 200) {
//         const stockData = { name: inputStock, data: response.data };
//         setStocks(stockData);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Internal server error');
//     }
//   };

//   useEffect(() => {
//     handleSearchStock();

//     return () => {
//       setOpenBuyModal(false);
//     };
//   }, []);

//   return (
//     <Box sx={{ width: '100%', height: '600px' }}>
//       {/* Render BuySellModal for buying action */}
//       {openBuyModal && (
//         <BuySellModal
//           type="BUY"
//           onClose={() => setOpenBuyModal(false)}
//           message={stocks}
//         />
//       )}

//       <Stack direction="row" spacing={1}>
//         <TextField
//           sx={{ width: '80%' }}
//           value={inputStock}
//           onChange={(e) => setInputStock(e.target.value.toUpperCase())}
//           color="secondary"
//           id="outlined-basic"
//           label="Search stock"
//           variant="outlined"
//         />
//         <Button
//           onClick={handleSearchStock}
//           sx={{
//             color: '#fff',
//             background: '#D43725',
//             fontSize: '0.9rem!important',
//             padding: '0.5rem 2rem',
//             '&:hover': {
//               background: '#D43725',
//               opacity: 0.8,
//             },
//           }}
//         >
//           Search
//         </Button>
//       </Stack>

//       {/* Render stocks list */}
//       <Box
//         sx={{
//           overflowY: 'auto',
//           height: '530px',
//           margin: '1rem 0rem',
//         }}
//       >
//          <Box sx={{ flexGrow: 1, padding: 2 }}>
//       <Typography variant="h4" align="center">{name} Market Data</Typography>
//       <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">Basic Information</Typography>
//             <Typography>Base Price: {data.basePrice}</Typography>
//             <Typography>Close Price: {data.close}</Typography>
//             <Typography>Open Price: {data.open}</Typography>
//             <Typography>VWAP: {data.vwap}</Typography>
//             <Typography>Last Price: {data.lastPrice}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">Price Change</Typography>
//             <Typography>Change: {data.change}</Typography>
//             <Typography>Percent Change: {data.pChange}%</Typography>
//             <Typography>Price Band: {data.pPriceBand}</Typography>
//             <Typography>Lower Circuit Price: {data.lowerCP}</Typography>
//             <Typography>Upper Circuit Price: {data.upperCP}</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6">Highs and Lows</Typography>
//             <Typography>Week High: {data.weekHighLow.max} (on {data.weekHighLow.maxDate})</Typography>
//             <Typography>Week Low: {data.weekHighLow.min} (on {data.weekHighLow.minDate})</Typography>
//             <Typography>Intra-day High: {data.intraDayHighLow.max}</Typography>
//             <Typography>Intra-day Low: {data.intraDayHighLow.min}</Typography>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//       </Box>

//       {/* Action buttons */}
//       <Button
//         onClick={handleBuyStock}
//         sx={{
//           color: '#fff',
//           margin: '10px',
//           background: '#D43725',
//           fontSize: '0.9rem!important',
//           padding: '0.5rem 2rem',
//           '&:hover': {
//             background: '#D43725',
//             opacity: 0.8,
//           },
//         }}
//       >
//         BUY
//       </Button>

//       <Button
//         onClick={handleAddToWatchlist}
//         sx={{
//           color: '#fff',
//           margin: '10px',
//           background: '#D43725',
//           fontSize: '0.9rem!important',
//           padding: '0.5rem 2rem',
//           '&:hover': {
//             background: '#D43725',
//             opacity: 0.8,
//           },
//         }}
//       >
//         Add To Watchlist
//       </Button>
//     </Box>
//   );
// }

// export default Watchlist;





import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography, Paper, Grid } from '@mui/material';
import BuySellModal from '../modals/BuySellModal'; // Import the BuySellModal component
import axios from 'axios';

function Watchlist() {
  const [inputStock, setInputStock] = useState('');
  const [stocks, setStocks] = useState([]);
  const [openBuyModal, setOpenBuyModal] = useState(false);

  const handleBuyStock = () => {
    setOpenBuyModal(true); // Open BuySellModal for buying
  };

  const handleAddToWatchlist = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/watchlist/add`, {stocks});
        if (response.status === 200) {
          alert('Added to Watchlist');
        } else {
          alert('Failed to add to Watchlist');
        }
      } catch (err) {
        console.error(err);
        alert('Error adding to Watchlist');
      }
  };

  const handleSearchStock = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/${inputStock}`);
    try {
      if (response.status === 200) {
        const stockData = { name: inputStock, data: response.data };
        setStocks(stockData);
      }
    } catch (err) {
      console.error(err);
      alert('Internal server error');
    }
  };

  useEffect(() => {
    handleSearchStock();

    return () => {
      setOpenBuyModal(false);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: '600px' }}>
      {/* Render BuySellModal for buying action */}
      {openBuyModal && (
        <BuySellModal
          type="BUY"
          onClose={() => setOpenBuyModal(false)}
          message={stocks}
        />
      )}

      <Stack direction="row" spacing={1}>
        <TextField
          sx={{ width: '80%' }}
          value={inputStock}
          onChange={(e) => setInputStock(e.target.value.toUpperCase())}
          color="secondary"
          id="outlined-basic"
          label="Search stock"
          variant="outlined"
        />
        <Button
          onClick={handleSearchStock}
          sx={{
            color: '#fff',
            background: '#D43725',
            fontSize: '0.9rem!important',
            padding: '0.5rem 2rem',
            '&:hover': {
              background: '#D43725',
              opacity: 0.8,
            },
          }}
        >
          Search
        </Button>
      </Stack>

      {/* Render Market Data */}
      <Box sx={{ overflowY: 'auto', height: '530px', margin: '1rem 0rem' }}>
      <Box sx={{ overflowY: 'auto', height: '530px', margin: '1rem 0rem' }}>
  {stocks.data ? (
    <>
      <Typography variant="h4" align="center">{stocks.name} Market Data</Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Basic Information</Typography>
            <Typography>Base Price: {stocks.data.basePrice || 'N/A'}</Typography>
            <Typography>Close Price: {stocks.data.close || 'N/A'}</Typography>
            <Typography>Open Price: {stocks.data.open || 'N/A'}</Typography>
            <Typography>VWAP: {stocks.data.vwap || 'N/A'}</Typography>
            <Typography>Last Price: {stocks.data.lastPrice || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Price Change</Typography>
            <Typography style={{ color: stocks.data.change < 0 ? 'red' : 'green' }}>
              Change: {stocks.data.change ? stocks.data.change.toFixed(2) : 'N/A'}
            </Typography>
            <Typography style={{ color: stocks.data.pChange < 0 ? 'red' : 'green' }}>
              Percent Change: {stocks.data.pChange ? stocks.data.pChange.toFixed(2) + '%' : 'N/A'}
            </Typography>
            <Typography>Price Band: {stocks.data.pPriceBand || 'N/A'}</Typography>
            <Typography>Lower Circuit Price: {stocks.data.lowerCP || 'N/A'}</Typography>
            <Typography>Upper Circuit Price: {stocks.data.upperCP || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Highs and Lows</Typography>
            <Typography>
              Week High: {stocks.data.weekHighLow.max || 'N/A'} (on {stocks.data.weekHighLow.maxDate || 'N/A'})
            </Typography>
            <Typography>
              Week Low: {stocks.data.weekHighLow.min || 'N/A'} (on {stocks.data.weekHighLow.minDate || 'N/A'})
            </Typography>
            <Typography>Intra-day High: {stocks.data.intraDayHighLow.max || 'N/A'}</Typography>
            <Typography>Intra-day Low: {stocks.data.intraDayHighLow.min || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  ) : (
    <Typography variant="body1" align="center">No data available</Typography>
  )}
</Box>

      </Box>

      {/* Action buttons */}
      <Button
        onClick={handleBuyStock}
        sx={{
          color: '#fff',
          margin: '10px',
          background: '#D43725',
          fontSize: '0.9rem!important',
          padding: '0.5rem 2rem',
          '&:hover': {
            background: '#D43725',
            opacity: 0.8,
          },
        }}
      >
        BUY
      </Button>

      <Button
        onClick={handleAddToWatchlist}
        sx={{
          color: '#fff',
          margin: '10px',
          background: '#D43725',
          fontSize: '0.9rem!important',
          padding: '0.5rem 2rem',
          '&:hover': {
            background: '#D43725',
            opacity: 0.8,
          },
        }}
      >
        Add To Watchlist
      </Button>
    </Box>
  );
}

export default Watchlist;


// import React, { useState, useEffect } from 'react';
// import { Box, Button, Stack, TextField } from '@mui/material';
// import BuySellModal from '../modals/BuySellModal'; // Import the BuySellModal component
// import axios from 'axios';

// function Watchlist() {
//   const [inputStock, setInputStock] = useState('');
//   const [stocks, setStocks] = useState([]);
//   const [openBuyModal, setOpenBuyModal] = useState(false); // State for BuySellModal for buying action
//   const [openSellModal, setOpenSellModal] = useState(false); // State for BuySellModal for selling action

//   const handleBuyStock = () => {
//     // setOpenBuyModal(true); // Open BuySellModal for buying
//     console.log("button clicked");
//   };

//   const handleSellStock = () => {
//     setOpenSellModal(true); // Open BuySellModal for selling
//   };

//   const handleSearchStock = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/${inputStock}`);
//       if (response.status === 200) {
//         setStocks(response.data);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Internal server error");
//     }
//   };

//   useEffect(() => {
//     handleSearchStock(); // Trigger search on component mount (you might want to adjust this logic)
//   }, []); // Empty dependency array means this effect runs only once on mount

//   return (
//     <Box sx={{ width: '100%', height: '600px' }}>
//       {/* Render BuySellModal for buying action */}
//       {openBuyModal && (
//         <BuySellModal
//           type="BUY"
//           onClose={() => setOpenBuyModal(false)} // Close BuySellModal for buying action
//         />
//       )}

//       {/* Render BuySellModal for selling action */}
//       {openSellModal && (
//         <BuySellModal
//           type="SELL"
//           onClose={() => setOpenSellModal(false)} // Close BuySellModal for selling action
//         />
//       )}

//       <Stack direction="row" spacing={1}>
//         <TextField
//           sx={{ width: '80%' }}
//           value={inputStock}
//           onChange={(e) => setInputStock(e.target.value.toUpperCase())}
//           color="secondary"
//           id="outlined-basic"
//           label="Search stock"
//           variant="outlined"
//         />
//         <Button
//           onClick={handleSearchStock}
//           sx={{
//             color: '#fff',
//             background: '#D43725',
//             fontSize: '0.9rem!important',
//             padding: '0.5rem 2rem',
//             '&:hover': {
//               background: '#D43725',
//               opacity: 0.8,
//             },
//           }}
//         >
//           Search
//         </Button>
//       </Stack>

//       {/* Render stocks list */}
//       <Box
//         sx={{
//           overflowY: 'auto',
//           height: '530px',
//           margin: '1rem 0rem',
//         }}
//       >
//         <pre>{JSON.stringify(stocks, null, 2)}</pre>
//       </Box>

//       {/* Your other JSX code */}
//       <Button
//         onClick={handleBuyStock}
//         sx={{
//           color: '#fff',
//           background: '#D43725',
//           fontSize: '0.9rem!important',
//           padding: '0.5rem 2rem',
//           '&:hover': {
//             background: '#D43725',
//             opacity: 0.8,
//           },
//         }}
//       >
//         BUY
//       </Button>

//       <Button
//         onClick={handleSellStock}
//         sx={{
//           color: '#fff',
//           background: '#D43725',
//           fontSize: '0.9rem!important',
//           padding: '0.5rem 2rem',
//           '&:hover': {
//             background: '#D43725',
//             opacity: 0.8,
//           },
//         }}
//       >
//         SELL
//       </Button>
//       {/* Your other JSX code */}
//     </Box>
//   );
// }

// export default Watchlist;
