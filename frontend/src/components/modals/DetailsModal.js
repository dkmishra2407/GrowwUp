import { Modal } from '@mui/material';
import React from 'react';

const DetailsModal = ({ data }) => {
  console.log("hello")
  return (
    <Modal>
      <div>
      <p><strong>Index Symbol:</strong> {data.indexSymbol}</p>
      <p><strong>Key:</strong> {data.key}</p>
      <p><strong>Last Price:</strong> {data.last}</p>
      <p><strong>Open Price:</strong> {data.open}</p>
      <p><strong>Previous Close:</strong> {data.previousClose}</p>
      <p><strong>High:</strong> {data.high}</p>
      <p><strong>Low:</strong> {data.low}</p>
      <p><strong>Variation:</strong> {data.variation}</p>
      <p><strong>Percentage Change:</strong> {data.percentChange}%</p>
      <hr />
      <h2>Historical Prices</h2>
      <p><strong>One Month Ago Price:</strong> {data.oneMonthAgo}</p>
      <p><strong>One Week Ago Price:</strong> {data.oneWeekAgo}</p>
      <p><strong>One Year Ago Price:</strong> {data.oneYearAgo}</p>
      <hr />
      <h2>Yearly Information</h2>
      <p><strong>Year High:</strong> {data.yearHigh}</p>
      <p><strong>Year Low:</strong> {data.yearLow}</p>
      <hr />
      <h2>Market Statistics</h2>
      <p><strong>Advances:</strong> {data.advances}</p>
      <p><strong>Declines:</strong> {data.declines}</p>
      <p><strong>Unchanged:</strong> {data.unchanged}</p>
      <p><strong>Market Status:</strong> {data.marketStatus}</p>
      <hr />
      <h2>Financial Ratios</h2>
      <p><strong>Dividend Yield (DY):</strong> {data.dy}</p>
      <p><strong>Price to Earnings (PE):</strong> {data.pe}</p>
      <p><strong>Price to Book (PB):</strong> {data.pb}</p>
      <hr />
      <h2>Percentage Change (Last 30 Days and 365 Days)</h2>
      <p><strong>Last 30 Days:</strong> {data.perChange30d}%</p>
      <p><strong>Last 365 Days:</strong> {data.perChange365d}%</p>
      <hr />
      <div>
        <h2>Charts</h2>
        <img src={data.chartTodayPath} alt="Today's Chart" />
        <img src={data.chart30dPath} alt="30 Days Chart" />
        <img src={data.chart365dPath} alt="365 Days Chart" />
      </div>
    </div>
    </Modal>
  );
};

export default DetailsModal;
