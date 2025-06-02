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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  role: Yup.string().required('Role is required'),
});

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
      valueGetter: (params) =>
        params.row.role.charAt(0).toUpperCase() + params.row.role.slice(1),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
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
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [paginationModel]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers(
        paginationModel.page + 1,
        paginationModel.pageSize
      );
      setUsers(response.users);
      setRowCount(response.totalUsers);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      role: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.id) {
          await userService.updateUser(values.id, values);
          toast.success('User updated successfully');
        } else {
          // Note: In a real application, you would need to handle password creation
          // This is just a placeholder
          toast.error('User creation not implemented');
        }
        setOpenDialog(false);
        fetchUsers();
        formik.resetForm();
      } catch (error) {
        toast.error('Failed to update user');
        console.error('Error updating user:', error);
      }
    },
  });

  const handleEdit = (user) => {
    formik.setValues(user);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error('Failed to delete user');
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Users</Typography>
      </Box>

      <Box height={600}>
        <DataGrid
          rows={users}
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
        <DialogTitle>Edit User</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="store_owner">Store Owner</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Users; 