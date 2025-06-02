import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
} from '@mui/material';

function Dashboard() {
  // Mock data - replace with actual API call
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    recentReviews: [
      {
        id: 1,
        storeName: 'Sample Store 1',
        rating: 5,
        comment: 'Great experience!',
        date: '2024-03-15'
      },
      {
        id: 2,
        storeName: 'Sample Store 2',
        rating: 4,
        comment: 'Good service overall.',
        date: '2024-03-14'
      }
    ],
    stats: {
      totalReviews: 15,
      averageRating: 4.3,
      storesReviewed: 8
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Total Reviews
            </Typography>
            <Typography variant="h3">
              {userData.stats.totalReviews}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Average Rating
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h3" sx={{ mr: 1 }}>
                {userData.stats.averageRating}
              </Typography>
              <Rating value={userData.stats.averageRating} precision={0.1} readOnly />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Stores Reviewed
            </Typography>
            <Typography variant="h3">
              {userData.stats.storesReviewed}
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Reviews */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Reviews
            </Typography>
            <List>
              {userData.recentReviews.map((review) => (
                <ListItem key={review.id}>
                  <ListItemAvatar>
                    <Avatar>{review.storeName[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={review.storeName}
                    secondary={
                      <>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">
                          {review.comment}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 