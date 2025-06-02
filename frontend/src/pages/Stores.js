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
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { storeService } from '../services/storeService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup.string().required('Store name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
});

const Stores = () => {
  const { user } = useAuth();
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
    { field: 'name', headerName: 'Store Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    {
      field: 'averageRating',
      headerName: 'Average Rating',
      width: 130,
      valueGetter: (params) => params.row.averageRating?.toFixed(1) || 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          {user.role === 'store_owner' && params.row.ownerId === user.id && (
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
    fetchStores();
  }, [paginationModel]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await storeService.getStores(
        paginationModel.page + 1,
        paginationModel.pageSize
      );
      setStores(response.stores);
      setRowCount(response.totalStores);
    } catch (error) {
      toast.error('Failed to fetch stores');
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await storeService.createStore(values);
        toast.success('Store created successfully');
        setOpenDialog(false);
        fetchStores();
        formik.resetForm();
      } catch (error) {
        toast.error('Failed to create store');
        console.error('Error creating store:', error);
      }
    },
  });

  const handleEdit = (store) => {
    formik.setValues(store);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await storeService.deleteStore(id);
        toast.success('Store deleted successfully');
        fetchStores();
      } catch (error) {
        toast.error('Failed to delete store');
        console.error('Error deleting store:', error);
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Stores</Typography>
        {user.role === 'store_owner' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              formik.resetForm();
              setOpenDialog(true);
            }}
          >
            Add Store
          </Button>
        )}
      </Box>

      <Box height={600}>
        <DataGrid
          rows={stores}
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
          {formik.values.id ? 'Edit Store' : 'Add New Store'}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Store Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {formik.values.id ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Stores; 