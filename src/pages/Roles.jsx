import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, 
  InputAdornment, Stack, Card, CardContent
} from '@mui/material';
import { Add, Edit, Delete, AdminPanelSettings, Payments } from '@mui/icons-material';

function Roles() {
  // Data Dummy Awal
  const [roles, setRoles] = useState([
    { id: 1, name: 'Supervisor', salary: 7000000 },
    { id: 2, name: 'Kepala Toko', salary: 5500000 },
    { id: 3, name: 'Helper', salary: 4200000 },
  ]);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', salary: '' });

  // Format Rupiah
  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleOpen = (role = null) => {
    if (role) {
      setEditId(role.id);
      setFormData({ name: role.name, salary: role.salary });
    } else {
      setEditId(null);
      setFormData({ name: '', salary: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', salary: '' });
  };

  const handleSubmit = () => {
    if (editId) {
      setRoles(roles.map(r => r.id === editId ? { ...r, ...formData } : r));
    } else {
      setRoles([...roles, { id: Date.now(), ...formData }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus role ini?')) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">Role & Salary Management</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Role Baru
        </Button>
      </Stack>

      {/* Stats Card */}
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
                  <Typography variant="body2" fontWeight="medium">{role.name}</Typography>
                </TableCell>
                <TableCell>{formatIDR(role.salary)}</TableCell>
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Jumlah Gaji"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
              }}
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || 0 })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} color="inherit">Batal</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.salary}
          >
            Simpan Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Roles;