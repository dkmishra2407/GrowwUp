import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography, Paper, Grid } from '@mui/material';
import BuySellModal from '../modals/BuySellModal'; // Import the BuySellModal component
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Watchlist() {
  const [inputStock, setInputStock] = useState('');
  const [stocks, setStocks] = useState([]);
  const [openBuyModal, setOpenBuyModal] = useState(false);

  const handleBuyStock = () => {
    setOpenBuyModal(true); // Open BuySellModal for buying
  };

  const handleAddToWatchlist = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('cmUser')).myuserid
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/watchlist/add`, {userId , stocks});
        if (response.status === 200) {
          toast.success('Added to Watchlist');
        } else {
          toast.error('Failed to add to Watchlist');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error adding to Watchlist');
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
      toast.error('Internal server error');
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
        <ToastContainer/>
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
