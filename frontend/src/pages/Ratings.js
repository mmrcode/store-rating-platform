import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ratingService } from '../services/ratingService';
import { storeService } from '../services/storeService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  storeId: Yup.number().required('Store is required'),
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
});

const Ratings = () => {
  const { user } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'storeName',
      headerName: 'Store',
      width: 200,
      valueGetter: (params) => params.row.store?.name || 'N/A',
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 130,
      renderCell: (params) => (
        <Rating value={params.row.rating} readOnly precision={0.5} />
      ),
    },
    {
      field: 'userName',
      headerName: 'User',
      width: 200,
      valueGetter: (params) => params.row.user?.name || 'N/A',
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 200,
      valueGetter: (params) =>
        new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          {user.id === params.row.userId && (
            <>
              <Button
                size="small"
                onClick={() => handleEdit(params.row)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchRatings();
    fetchStores();
  }, [paginationModel]);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const response = await ratingService.getRatings(
        paginationModel.page + 1,
        paginationModel.pageSize
      );
      setRatings(response.ratings);
      setRowCount(response.totalRatings);
    } catch (error) {
      toast.error('Failed to fetch ratings');
      console.error('Error fetching ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await storeService.getStores(1, 1000);
      setStores(response.stores);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      storeId: '',
      rating: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.id) {
          await ratingService.updateRating(values.id, values);
          toast.success('Rating updated successfully');
        } else {
          await ratingService.submitRating(values);
          toast.success('Rating submitted successfully');
        }
        setOpenDialog(false);
        fetchRatings();
        formik.resetForm();
      } catch (error) {
        toast.error('Failed to submit rating');
        console.error('Error submitting rating:', error);
      }
    },
  });

  const handleEdit = (rating) => {
    formik.setValues(rating);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rating?')) {
      try {
        await ratingService.deleteRating(id);
        toast.success('Rating deleted successfully');
        fetchRatings();
      } catch (error) {
        toast.error('Failed to delete rating');
        console.error('Error deleting rating:', error);
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Ratings</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            formik.resetForm();
            setOpenDialog(true);
          }}
        >
          Submit Rating
        </Button>
      </Box>

      <Box height={600}>
        <DataGrid
          rows={ratings}
          columns={columns}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          rowCount={rowCount}
          paginationMode="server"
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {formik.values.id ? 'Edit Rating' : 'Submit Rating'}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Store</InputLabel>
              <Select
                name="storeId"
                value={formik.values.storeId}
                onChange={formik.handleChange}
                error={formik.touched.storeId && Boolean(formik.errors.storeId)}
              >
                {stores.map((store) => (
                  <MenuItem key={store.id} value={store.id}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box mt={2}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formik.values.rating}
                onChange={(event, newValue) => {
                  formik.setFieldValue('rating', newValue);
                }}
                precision={0.5}
              />
              {formik.touched.rating && formik.errors.rating && (
                <Typography color="error" variant="caption">
                  {formik.errors.rating}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {formik.values.id ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Ratings; 