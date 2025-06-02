import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Store Rating Platform
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Rate and review your favorite stores. Share your experiences and help others make informed decisions.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/stores"
            sx={{ mr: 2 }}
          >
            Browse Stores
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={RouterLink}
            to="/register"
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home; 