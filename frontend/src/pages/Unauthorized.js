import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      textAlign="center"
    >
      <Typography variant="h3" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        You don't have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(user ? '/dashboard' : '/login')}
      >
        {user ? 'Go to Dashboard' : 'Go to Login'}
      </Button>
    </Box>
  );
};

export default Unauthorized; 