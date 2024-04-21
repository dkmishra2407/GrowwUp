import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import axios from 'axios';

const SellBuyModal = (props) => {
  const [open, setOpen] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [sellMessage, setSellMessage] = useState('');

  const handleClose = () => setOpen(false);

  const handleSellStock = async () => {
    try {
      if (!props.message || !props.message.data) {
        throw new Error('Invalid message format');
      }

      const { symbol, data } = props.message;
      const { lastPrice } = data;

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/stock/sell`, {
        symbol,
        orderType: 'Sell',
        priceType: 'market',
        productType: 'Delivery',
        qty: quantity,
        price: lastPrice, // Use lastPrice instead of price
        userId: 'naBsR0p2vW', // Replace with actual user ID
        stockPrice: lastPrice, // Use lastPrice instead of price
      });

      if (response.data.success) {
        setSellMessage(response.data.data.message);
        // Additional logic if needed
      } else {
        setSellMessage('Failed to place sell order');
      }
    } catch (error) {
      console.error('Error selling stock:', error.message);
      setSellMessage('Error selling stock. Please try again.');
    }
  };

  if (!props.message || !props.message.data) {
    // Render nothing or handle the situation where message or data is missing
    return (
      <Modal open={open} onClose={handleClose}>
        <Box>
          <Typography>Error: Invalid message format</Typography>
        </Box>
      </Modal>
    );
  }

  const { data } = props.message;
  const { lastPrice } = data;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 500,
          height: 500,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          p: 2,
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h6" id="modal-title">
            Sell Stock
          </Typography>
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
          <TextField value={lastPrice} label="Price" />
          <TextField value={lastPrice * quantity} label="Total" />
          <Button variant="contained" color="primary" onClick={handleSellStock}>
            Sell
          </Button>
          <Typography variant="body1" id="modal-description">
            {sellMessage}
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SellBuyModal;


// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { Stack, TextField } from '@mui/material';
// import axios from 'axios';

// const BuySellModal = (props) => {

//   console.log(props.message.data.lastPrice);
//   const [open, setOpen] = useState(true);
//   const [quantity, setQuantity] = useState(0);
//   const [buyMessage, setBuyMessage] = useState('');

//   const handleClose = () => setOpen(false);

//   const handleBuyStock = async () => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/stock/buy`, {
//         symbol: props.message.name,
//         orderType: 'Buy', // or 'Sell' based on the modal type
//         priceType: 'market', // or 'Limit' based on your logic
//         productType: 'Delivery', // or other product types
//         qty: quantity,
//         price: props.message.data.lastPrice, // Assuming props.message contains last price
//         userId: 'naBsR0p2vW', // Replace with actual user ID
//         stockPrice: props.message.data.lastPrice // Assuming props.message contains last price
//       });

//       if (response.data.success) {
//         setBuyMessage(response.data.data.message);
//         // You can add further logic here, like updating UI or handling state
//       } else {
//         setBuyMessage('Failed to place buy order'); // Handle error messages
//       }
//     } catch (error) {
//       console.error('Error buying stock:', error);
//       setBuyMessage('Error buying stock. Please try again.'); // Handle error messages
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           width: 500,
//           height: 500,
//           bgcolor: 'background.paper',
//           borderRadius: '8px',
//           p: 2,
//         }}
//       >
//         <Stack direction="column" spacing={2}>
//           <Typography variant="h6" id="modal-title">
//             Buy & Sell
//           </Typography>
//           <TextField
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             sx={{ width: '80%' }}
//             color="secondary"
//             id="quantity"
//             label="Quantity"
//             variant="outlined"
//             placeholder='0'
//           />
//           <TextField value={props.message.data.lastPrice} />
//           <TextField value={props.message.data.lastPrice * quantity} />
//           <Button variant="contained" color="primary" onClick={handleBuyStock}>
//             BUY
//           </Button>
//           <Typography variant="body1" id="modal-description">
//             {buyMessage}
//           </Typography>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// };

// export default BuySellModal;
