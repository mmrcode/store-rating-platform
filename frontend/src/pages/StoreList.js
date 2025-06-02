import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Rating, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function StoreList() {
  // Mock data - replace with actual API call
  const stores = [
    {
      id: 1,
      name: 'Sample Store 1',
      description: 'A great store with amazing products',
      rating: 4.5,
      reviewCount: 120
    },
    {
      id: 2,
      name: 'Sample Store 2',
      description: 'Your one-stop shop for everything',
      rating: 4.2,
      reviewCount: 85
    },
    {
      id: 3,
      name: 'Sample Store 3',
      description: 'Quality products at affordable prices',
      rating: 4.8,
      reviewCount: 200
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Stores
      </Typography>
      <Grid container spacing={3}>
        {stores.map((store) => (
          <Grid item xs={12} sm={6} md={4} key={store.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {store.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {store.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={store.rating} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({store.reviewCount} reviews)
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={RouterLink}
                  to={`/stores/${store.id}`}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default StoreList; 