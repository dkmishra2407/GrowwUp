import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Link,Route,BrowserRouter as Router } from 'react-router-dom';

const Learn = () => {
  return (
    <Box>
      <Typography>
      <Stack>
        LEARNING PAGE QUOTES
        <Link to={'./learning_pages/Web'}> click me </Link>
      </Stack>
    </Typography>
    </Box>
  );
};

export default Learn;
