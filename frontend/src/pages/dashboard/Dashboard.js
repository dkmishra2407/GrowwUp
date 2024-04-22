import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Dashboard = () => {
  const [mydata, setMyData] = useState([]);
  const [data, setData] = useState([]);
  const [details, setDetails] = useState(null);

  const fetchDetailsData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8002/details');
      setDetails(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchHolidayData();
    fetchDetailsData();
  }, []);

  const handleDetails = (data) => {



    alert(
      `Index Symbol: ${details.indexSymbol}\n` +
      `Key: ${details.key}\n` +
      `Last Price: ${details.last}\n` +
      `Open Price: ${details.open}\n` +
      `Previous Close: ${details.previousClose}\n` +
      `High: ${details.high}\n` +
      `Low: ${details.low}\n` +
      `Variation: ${details.variation}\n` +
      `Percentage Change: ${details.percentChange}%\n\n` +
      `Historical Prices:\n` +
      `One Month Ago Price: ${details.oneMonthAgo}\n` +
      `One Week Ago Price: ${details.oneWeekAgo}\n` +
      `One Year Ago Price: ${details.oneYearAgo}\n\n` +
      `Yearly Information:\n` +
      `Year High: ${details.yearHigh}\n` +
      `Year Low: ${details.yearLow}\n\n` +
      `Market Statistics:\n` +
      `Advances: ${details.advances}\n` +
      `Declines: ${details.declines}\n` +
      `Unchanged: ${details.unchanged}\n` +
      `Market Status: ${details.marketStatus}\n\n` +
      `Financial Ratios:\n` +
      `Dividend Yield (DY): ${details.dy}\n` +
      `Price to Earnings (PE): ${details.pe}\n` +
      `Price to Book (PB): ${details.pb}\n\n` +
      `Percentage Change (Last 30 Days and 365 Days):\n` +
      `Last 30 Days: ${details.perChange30d}%\n` +
      `Last 365 Days: ${details.perChange365d}%`
    );
  }

 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8002/');
      setMyData(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchHolidayData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8002/holidaydata');
      setData(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      
      <Typography variant="h4" align="center">Market Status</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">MARKET TYPE</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">DATE</TableCell>
            <TableCell align="right">Index</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">Change (%)</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mydata.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="right">{item.market}</TableCell>
              <TableCell align="right" style={{ color: item.marketStatus === "Close" ? 'red' : 'green' }}>{item.marketStatus}</TableCell>
              <TableCell align="right">{item.tradeDate}</TableCell>
              <TableCell align="right">{item.index}</TableCell>
              <TableCell align="right">{item.last}</TableCell>
              <TableCell align="right" style={{ color: item.variation < 0 ? 'red' : 'green' }}>{item.variation}</TableCell>
              <TableCell align="right" style={{ color: item.percentChange < 0 ? 'red' : 'green' }}>{item.percentChange}</TableCell>
              <TableCell align="right">
  {index === 0 && (
    <Button onClick={() => handleDetails(item)} variant="contained" color="brand">
      Click Me <VisibilityIcon/>
    </Button>
  )}
</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h4" align="center">Market Holidays</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">MARKET TYPE</TableCell>
            <TableCell align="center">HOLIDAYS</TableCell>
            <TableCell align="center">DATE</TableCell>
            <TableCell align="center">DAY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{item.Product}</TableCell>
              <TableCell align="center">{item.description}</TableCell>
              <TableCell align="center">{item.tradingDate}</TableCell>
              <TableCell align="center">{item.weekDay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
    </Box>
  );
};

export default Dashboard;
