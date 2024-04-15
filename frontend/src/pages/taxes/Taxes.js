import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

function Taxes() {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleBuyRefresh = () => {
    // Handle buy refresh logic here
    setQuantity(0);
    setPrice(0);
  };

  const totalValue = (quantity * price).toFixed(2);
  const totalTaxes = (13.5+0.18*price*quantity*0.0000345+0.001*price*quantity+0.0000345*price*quantity+0.18*price*quantity*0.0000345+10/10000000*price*quantity+0.00015*price*quantity).toFixed(2);

  return (
  <>
  <Typography variant="h5" sx={{ mb: 4 }}>Check Your Taxes Here</Typography>
    <Box marginLeft={'250px'} width={'1100px'}>
      <Stack spacing={10} direction="row">
        <Stack sx={{ width: '50%' }}>
          <Stack sx={{ background: "#3869e7", p: 2 }}>
            <Typography sx={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600' }}>BUY & SELL</Typography>
          </Stack>
          <Stack spacing={2} sx={{ background: "#ff000010", p: 2 }}>
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{ width: '80%' }}
              color="secondary"
              id="quantity"
              label="Quantity"
              variant="outlined"
              placeholder='0'
            />
            <TextField
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              sx={{ width: '80%' }}
              color="secondary"
              id="price"
              label="Price per Share"
              variant="outlined"
              placeholder='0'
            />
            <TextField
              value={0}
              sx={{ width: '80%' }}
              color="secondary"
              id="cttStt"
              label="Brokerage"
              variant="outlined"
            />
            <TextField
              value={0.001*price*quantity}
              sx={{ width: '80%' }}
              color="secondary"
              id="cttStt"
              label="CTT/STT"
              variant="outlined"
            />
            <TextField
              value={0.0000345*price*quantity}
              sx={{ width: '80%' }}
              color="secondary"
              id="transactionCharges"
              label="Transaction Charges"
              variant="outlined"
            />
            <TextField
              value={0.18*price*quantity*0.0000345}
              sx={{ width: '80%' }}
              color="secondary"
              id="gst"
              label="GST"
              variant="outlined"
            />
            <TextField
              value={10/10000000*price*quantity}
              sx={{ width: '80%' }}
              color="secondary"
              id="sebiCharges"
              label="SEBI Charges"
              variant="outlined"
            />
            <TextField
              value={0.00015*price*quantity}
              sx={{ width: '80%' }}
              color="secondary"
              id="sebiCharges"
              label="Stamp Charges"
              variant="outlined"
            />
            <TextField
              value={13.5+0.18*price*quantity*0.0000345}
              sx={{ width: '80%' }}
              color="secondary"
              id="sebiCharges"
              label="DP Charges"
              variant="outlined"
            />
          </Stack>
          <Stack direction="row">
            <Typography sx={{ background: '#ff0000', color: '#fff', fontWeight: '700', width: '30%', p: 1 }}>Total Value</Typography>
            <Typography sx={{ background: '#ff000070', color: '#ff0000', fontWeight: '700', width: '70%', textAlign: 'center', fontSize: '1.2rem', p: 1 }}>
              ₹{totalValue}
            </Typography>
            <Typography sx={{ background: '#ff0000', color: '#fff', fontWeight: '700', width: '30%', p: 1 }}>Total Taxes</Typography>
            <Typography sx={{ background: '#ff000070', color: '#ff0000', fontWeight: '700', width: '70%', textAlign: 'center', fontSize: '1.2rem', p: 1 }}>
              ₹{totalTaxes}
            </Typography>
          </Stack>
          <Stack sx={{ width: '100%' }} direction="row" justifyContent="flex-end" alignItems="center">
            <Button onClick={handleBuyRefresh} sx={{ width: '25%', color: '#d43725', background: 'transparent', border: '1px solid #d43725', mt: 2 }}>Refresh</Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
    </>
  );
}

export default Taxes;
