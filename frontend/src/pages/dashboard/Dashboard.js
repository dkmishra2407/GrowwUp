// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import { Button, Divider, Stack, Typography } from '@mui/material';
// import Chip from '@mui/material/Chip';
// import CircleIcon from '@mui/icons-material/Circle';
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
// import axios from 'axios';
// import GLTable from '../../components/tables/GLTable';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import moment from 'moment';
// import Loading from '../../components/loading/Loading';

// export default function Dashboard() {

//   const [marketStatus, setMarketStatus] = useState([]);
//   const [type, setType] = useState('gainers');




//   const handleRefreshGainerLosers = async () => {
//     setRefreshGL(true);
//   }

//   const [data, setData] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/');
//       const piku = await response.json();
//       setData(piku); // Set the data received from the API
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   useEffect(() => {
//     getMarketStatus();
//     getMarketHolidays();
//     fetchData();
//   }, []);


//   return (
//     <Box sx={{ flexGrow: 1, padding: 2 }}>
//       </Stack>
//       <Stack>
//         <Stack
//           direction="row"
//           alignItems="center"
//           spacing={1}
//           sx={{
//             width: '100%',
//             mt: 3
//           }} >
//           <Typography sx={{
//             fontSize: '1.5rem',
//             mb: 2
//           }} >Top Gainers and losers</Typography>
//           {
//             refreshGL ?
//             <Loading /> :
//             <RefreshIcon sx={{
//               cursor: 'pointer',
//               marginBottom: '1rem!important'
//             }} onClick={handleRefreshGainerLosers} />
//           }
//         </Stack>
//         <Stack
//           direction="row"
//           spacing={2} >
//           <Button
//             variant="contained"
//             onClick={() => setType('gainers')}
//             sx={{
//               background: "#4caf50",
//               color: '#fff',
//               '&:hover': {
//                 background: "transparent",
//                 color: '#4caf50',
//                 border: '1px solid #4caf50',
//                 boxShadow: 'none'
//               }
//             }} >Gainers</Button>
//           <Button
//             variant="contained"
//             onClick={() => setType('losers')}
//             sx={{
//               background: "#d43725",
//               color: '#fff',
//               '&:hover': {
//                 background: "transparent",
//                 color: '#d43725',
//                 border: '1px solid #d43725',
//                 boxShadow: 'none'
//               }
//             }} >Losers</Button>
//         </Stack>
//         <Stack sx={{
//           mt: 2,
//           overflowY: 'auto',
//           height: '600px'
//         }} >
//           <GLTable
//             type={type}
//             refreshGL={refreshGL}
//             setRefreshGL={setRefreshGL} />
//         </Stack>
//       </Stack>
//       return (
//     <Box>
//       <Typography variant="h4" align="center">Market Holidays</Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//           <TableCell align="right">MARKET TYPE</TableCell>
//             <TableCell align="right">HOLIDAYS</TableCell>
//             <TableCell align="right">DATE</TableCell>
//             <TableCell align="right">DAY</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data && data.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell align="right">{item.Product}</TableCell>
//               <TableCell align="right">{item.description}</TableCell>
//               <TableCell align="right">{item.tradingDate}</TableCell>
//               <TableCell align="right">{item.weekDay}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// }

// export default App;
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [refreshGL, setRefreshGL] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/');
      setData(response.data); // Set the data received from the API
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchGainers = async () => {
    try {
      const response = await axios.get('https://www.nseindia.com/api/live-analysis-variations?index=loosers');
      console.log(response.data);
      setData(response.data); // Set the data received from the API
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGainers();
  }, []);

  const handleRefreshGainerLosers = async () => {
    setRefreshGL(true);
    // Perform refresh logic here
    setTimeout(() => {
      setRefreshGL(false);
    }, 2000); // Simulating refresh with a delay
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box mt={3} display="flex" alignItems="center">
        <Typography variant="h5">Top Gainers and Losers</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={handleRefreshGainerLosers}
          disabled={refreshGL}
          sx={{ ml: 2 }}
        >
          {refreshGL ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>
      {/* Include additional components or logic for top gainers/losers here */}
      <Typography variant="h4" align="center">Market Holidays</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">MARKET TYPE</TableCell>
            <TableCell align="right">HOLIDAYS</TableCell>
            <TableCell align="right">DATE</TableCell>
            <TableCell align="right">DAY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="right">{item.Product}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">{item.tradingDate}</TableCell>
              <TableCell align="right">{item.weekDay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
