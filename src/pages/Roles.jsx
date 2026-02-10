import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  InputAdornment, Stack, Card, CardContent
} from '@mui/material';
import { Add, Edit, Delete, AdminPanelSettings, Payments, Message, Warning } from '@mui/icons-material';
import { AddRoles, deleteRole, editRole, GetDataRoles } from '../core/requestAPI';
import Swal from 'sweetalert2';


function Roles() {

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState((null));
  const [formData, setFormData] = useState({ role_name: '', base_salary: '' });
  const [roles, setRoles] = useState([]);
  const [aksi, setAksi] = useState(false)

  useEffect(() => {
    const fetchRoles = async () => {
      const temp = await GetDataRoles();
      setRoles(temp);
    };
    fetchRoles();
  }, []);

  // Format Rupiah
  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleOpen = async (role = null) => {
    if (role) {
      setEditId(role.id);
      const nama_role = role.role_name
      const gaji = role.base_salary
      setFormData({ role_name: nama_role, base_salary: gaji });
    } else {
      setEditId(null);
      setFormData({ role_name: '', base_salary: '' });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ role_name: '', base_salary: '' });
  };

  const handleSubmit = async () => {
    if (!editId) {
      try {
        const result = await AddRoles(formData)

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.message,
          timer: 2000,
          showConfirmButton: true
        })

        setAksi(prev => !prev)
        handleClose();

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          timer: 2000,
          text: error.message,
          showCloseButton: true
        })
      }
    } else {
      try {
        const result = await editRole(formData, editId)

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.message,
          timer: 2000,
          showConfirmButton: true
        })

        setAksi(prev => !prev)
        handleClose();

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal Edit Data",
          text: error.message
        })
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Apakah anda yakin ingin menghapus data role ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal"
    })


    if (confirm.isConfirmed) {
      try {
        const result = await deleteRole(id)

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.message,
          timer: 1000,
          showConfirmButton: false,
        })

        setAksi(prev => !prev)



      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal Menghapus",
          text: error.message,
        })
      }
    } else {
      return
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await GetDataRoles();
      setRoles(data);
    };

    fetchRoles();
  }, [aksi]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <h5 className='text-md md:text-xl font-bold'>Role & Salary Management</h5>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{
            minWidth: { xs: '48px', sm: 'auto' },
            px: { xs: 1, sm: 2 },
            '& .MuiButton-startIcon': {
              margin: { xs: 0, sm: '0 8px 0 -4px' } // Hilangkan margin ikon saat teks tidak ada
            },
            borderRadius: 3
          }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Role Baru
          </Box>
        </Button>
      </Stack>

      <Card sx={{ mb: 4, borderRadius: 3, maxWidth: 300 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <AdminPanelSettings color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">Total Role</Typography>
              <Typography variant="h6" fontWeight="bold">{roles.length} Jabatan</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#fdfdfd' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nama Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Standar Gaji</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">{role.role_name}</Typography>
                </TableCell>
                <TableCell>{formatIDR(role.base_salary)}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => handleOpen(role)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(role.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Add/Edit */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle fontWeight="bold">
          {editId ? 'Edit Role' : 'Tambah Role Baru'}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Nama Role"
              fullWidth
              placeholder="Contoh: Senior Helper"
              value={formData.role_name}
              onChange={(e) => setFormData({ ...formData, role_name: e.target.value })}
            />
            <TextField
              label="Jumlah Gaji"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
              }}
              value={formData.base_salary}
              onChange={(e) => setFormData({ ...formData, base_salary: parseInt(e.target.value) })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} color="inherit">Batal</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.role_name || !formData.base_salary}
          >
            Simpan Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Roles;