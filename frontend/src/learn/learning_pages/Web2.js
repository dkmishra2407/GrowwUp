import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

const Web2 = () => {
  return (
    <div className='abc'>
      <Box>
        <Stack>
          <Typography variant='h6'>
            <div>HELLO IT IS NEW PAGE</div>
            <p>A webhook can only access events that are available in the repository, organization, GitHub Marketplace account, GitHub Sponsors account, or GitHub App where it is installed.
            You cannot create webhooks for individual user accounts, or for events that are specific to user resources, like personal notifications or mentions.
            To create and manage webhooks, you must own or have admin access to the resource where the webhook is created and listening for events on. For example, to manage webhooks in an organization, you need admin permissions for that organization.
            Some webhook events are unique to certain types of webhooks. For example, an organization webhook can subscribe to events that 
            only occur at the organization level, which a repository webhook cannot subscribe to. For more information about the specific availability of each webhook, see "Webhook events and payloads."</p>
          </Typography>
        </Stack>
        <Button
          sx={{
            width : '200px',
            justifyContent : 'center',
            alignItems : 'center',
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
          Watch A Vedio
        </Button>
      </Box>
    </div>
  );
};

export default Web2;