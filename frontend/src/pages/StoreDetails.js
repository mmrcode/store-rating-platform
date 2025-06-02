import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';

function StoreDetails() {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const store = {
    id: parseInt(id),
    name: 'Sample Store',
    description: 'A great store with amazing products and excellent service.',
    rating: 4.5,
    reviewCount: 120,
    address: '123 Main Street, City, Country',
    phone: '+1 234 567 8900',
    email: 'contact@samplestore.com',
    reviews: [
      {
        id: 1,
        user: 'John Doe',
        rating: 5,
        comment: 'Excellent service and great products!',
        date: '2024-03-15'
      },
      {
        id: 2,
        user: 'Jane Smith',
        rating: 4,
        comment: 'Good store, but could improve on customer service.',
        date: '2024-03-14'
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {store.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={store.rating} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({store.reviewCount} reviews)
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          {store.description}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2">
              Address: {store.address}
            </Typography>
            <Typography variant="body2">
              Phone: {store.phone}
            </Typography>
            <Typography variant="body2">
              Email: {store.email}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          Recent Reviews
        </Typography>
        <List>
          {store.reviews.map((review) => (
            <ListItem key={review.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{review.user[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="span" variant="subtitle1">
                      {review.user}
                    </Typography>
                    <Rating value={review.rating} size="small" readOnly sx={{ ml: 1 }} />
                  </Box>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {review.comment}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default StoreDetails; 