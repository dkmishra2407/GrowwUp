// // import React from 'react';
// // import { Box, Typography, Stack } from '@mui/material';
// // import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// // const Learn = () => {
// //   return (
// //     <Box>
// //       <Typography variant="body1">
// //         LEARNING PAGE QUOTES
// //         <Stack>
// //           <Link to={'/learn/learning_pages/Web1'}>click me</Link>
// //           <Link to={'/learn/learning_pages/Web2'}>click me please</Link>
// //         </Stack>
// //       </Typography>
// //     </Box>
// //   );
// // };

// // export default Learn; // Make sure to export the component


// import React from 'react';
// import { Box, Typography, Stack, Button, Divider } from '@mui/material';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const Learn = () => {
//   // Dummy data for questions
//   const questions = [
//     'Question 1?',
//     'Question 2?',
//     'Question 3?',
//     'Question 4?',
//     'Question 5?',
//     'Question 6?',
//     'Question 7?',
//     'Question 8?',
//     'Question 9?',
//     'Question 10?',
//   ];

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         LEARNING PAGE
//       </Typography>
//       <Stack spacing={2} sx={{ marginBottom: '20px' }}>
//         {questions.map((question, index) => (
//           <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography variant="body1">{question}</Typography>
//             <Button variant="outlined" sx={{ marginLeft: '10px' }}>Answer</Button>
//           </Box>
//         ))}
//       </Stack>
//       <Divider />
//       <Box sx={{ marginTop: '20px' }}>
//         <Link to="/learn" sx={{ textDecoration: 'none' }}>
//           <Button variant="contained" color="primary">Back to Learning</Button>
//         </Link>
//       </Box>
//     </Box>
//   );
// };

// export default Learn;

import React from 'react';
import { Box, Typography, Stack, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Learn = () => {
  // Dummy data for questions
  const questions = [
    "What is the stock market, and how does it function?",
"What are stocks, and how are they traded in the stock market?",
"What are the primary stock exchanges globally, and how do they differ?",
"What is the role of stock brokers and how do they facilitate stock trading?",
"What are stock indices, and how are they used to measure market performance?",
"What is market capitalization, and how is it calculated for companies?",
"What are dividends, and how do they impact stock returns for investors?",
"What are bull and bear markets, and what factors contribute to their trends?",
"What is the significance of earnings reports and financial statements for investors?",
"How do economic indicators, such as GDP and unemployment rates, influence the stock market?",
"What are the different types of stock orders, such as market orders and limit orders?",
"What are stock splits and reverse stock splits, and why do companies undertake them?",
"How do company mergers and acquisitions impact stock prices and market dynamics?",
"What are Initial Public Offerings (IPOs), and how do they work for companies going public?",
"What is insider trading, and what regulations govern it in the stock market?",
"How do stock options and futures contracts differ from traditional stock trading?",
"What are exchange-traded funds (ETFs) and mutual funds, and how do they differ from individual stocks?",
"What is technical analysis, and how is it used to analyze stock price patterns?",
"What is fundamental analysis, and how is it used to evaluate the intrinsic value of stocks?",
"What are the risks associated with investing in the stock market, and how can investors mitigate these risks?"
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        LEARNING PAGE
      </Typography>
      <Stack spacing={2} sx={{ marginBottom: '20px' }}>
        {questions.map((question, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: '10px' }}>{question}</Typography>
            <Button variant="contained" color="primary" component={Link} to={`/learn/learning_pages/Web${index + 1}`}>
              Answer
            </Button>
          </Box>
        ))}
      </Stack>
      <Divider />
    </Box>
  );
};

export default Learn;
