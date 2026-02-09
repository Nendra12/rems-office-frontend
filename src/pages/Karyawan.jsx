import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Typography, Box, Chip, Menu, MenuItem, Dialog,
  DialogTitle, DialogContent, DialogActions, Avatar, Select, FormControl
} from '@mui/material';
import { MoreVert, Add, Visibility, Block } from '@mui/icons-material';
import FormTambahKaryawan from '../components/FormTambahKaryawan';

// Data Dummy Awal
const initialData = [
  { id: 1, name: 'Budi Santoso', email: 'budi@email.com', store: 'Toko Jakarta', salary: 'Rp 5.000.000', status: 'Aktif', approvalStatus: 'Approved', nik: '12345678', address: 'Jl. Melati No. 1', phone: '0812345', hireDate: '2023-01-10', contractEnd: '2026-01-10', role: 'Karyawan' },
  { id: 2, name: 'Siti Aminah', email: 'siti@email.com', store: 'Toko Bandung', salary: 'Rp 4.500.000', status: 'Aktif', approvalStatus: 'Pending', nik: '87654321', address: 'Jl. Mawar No. 5', phone: '0856789', hireDate: '2023-05-15', contractEnd: '2026-05-15', role: 'Karyawan' },
];

function Karyawan() {
  const [employees, setEmployees] = useState(initialData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);

  // Daftar toko yang tersedia
  const availableStores = ['Toko Jakarta', 'Toko Bandung', 'Toko Surabaya', 'Toko Medan', 'Toko Semarang'];
  const availableRoles = ['Admin', 'Manager', 'Kasir', 'Staff'];

  // State untuk Dialog Detail & Tambah
  const [openDetail, setOpenDetail] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  // Fungsi Menu Aksi
  const handleMenuOpen = (event, emp) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmp(emp);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleStatus = () => {
    setEmployees(employees.map(e =>
      e.id === selectedEmp.id ? { ...e, status: e.status === 'Aktif' ? 'Non-Aktif' : 'Aktif' } : e
    ));
    handleMenuClose();
  };

  const handleStoreChange = (empId, newStore) => {
    setEmployees(employees.map(e =>
      e.id === empId ? { ...e, store: newStore } : e
    ));
  };

  // Fungsi untuk menghitung sisa kontrak
  const calculateRemainingDays = (contractEnd) => {
    if (!contractEnd) return '-';
    const today = new Date();
    const endDate = new Date(contractEnd);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Habis';
    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return '1 hari';
    return `${diffDays} hari`;
  };

  const handleSaveEmployee = (formData) => {
    const newEmp = {
      id: employees.length + 1,
      name: formData.name,
      email: formData.email,
      store: formData.store,
      salary: formData.salary,
      status: 'Aktif',
      approvalStatus: 'Pending',
      nik: formData.nik,
      address: formData.address,
      phone: formData.phone,
      role: formData.role,
      hireDate: formData.contractStart,
      contractEnd: formData.contractEnd
    };
    setEmployees([...employees, newEmp]);
    setOpenAdd(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <h5 className='text-md md:text-lg font-bold'>Daftar Karyawan</h5>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenAdd(true)}
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
            Tambah Karyawan
          </Box>
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Profil Nama</TableCell>
              <TableCell>Penempatan Toko</TableCell>
              <TableCell>Gaji (View Only)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Status Approval</TableCell>
              <TableCell>Sisa Kontrak</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>{row.name.charAt(0)}</Avatar>
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={row.store}
                      onChange={(e) => handleStoreChange(row.id, e.target.value)}
                      sx={{ minWidth: 150 }}
                    >
                      {availableStores.map((store) => (
                        <MenuItem key={store} value={store}>{store}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{row.salary}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === 'Aktif' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.approvalStatus}
                    color={
                      row.approvalStatus === 'Approved' ? 'success' :
                        row.approvalStatus === 'Pending' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{calculateRemainingDays(row.contractEnd)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu Dropdown Aksi */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => setOpenDetail(true)}><Visibility sx={{ mr: 1 }} fontSize="small" /> Detail Karyawan</MenuItem>
        <MenuItem onClick={toggleStatus}>
          <Block sx={{ mr: 1 }} fontSize="small" color="error" />
          {selectedEmp?.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
        </MenuItem>
      </Menu>

      {/* Dialog Detail (Read Only) */}
      <Dialog open={openDetail} onClose={() => setOpenDetail(false)} fullWidth maxWidth="sm">
        <DialogTitle>Detail Karyawan</DialogTitle>
        <DialogContent dividers>
          {selectedEmp && (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Typography variant="caption">NIK</Typography>
              <Typography variant="body2">{selectedEmp.nik}</Typography>
              <Typography variant="caption">Nama Lengkap</Typography>
              <Typography variant="body2">{selectedEmp.name}</Typography>
              <Typography variant="caption">Email</Typography>
              <Typography variant="body2">{selectedEmp.email || '-'}</Typography>
              <Typography variant="caption">Alamat</Typography>
              <Typography variant="body2">{selectedEmp.address}</Typography>
              <Typography variant="caption">No. Telepon</Typography>
              <Typography variant="body2">{selectedEmp.phone}</Typography>
              <Typography variant="caption">Tanggal Masuk</Typography>
              <Typography variant="body2">{selectedEmp.hireDate}</Typography>
              <Typography variant="caption">Kontrak Berakhir</Typography>
              <Typography variant="body2">{selectedEmp.contractEnd || '-'}</Typography>
              <Typography variant="caption">Status Approval</Typography>
              <Typography variant="body2">
                <Chip
                  label={selectedEmp.approvalStatus}
                  color={
                    selectedEmp.approvalStatus === 'Approved' ? 'success' :
                      selectedEmp.approvalStatus === 'Pending' ? 'warning' : 'error'
                  }
                  size="small"
                />
              </Typography>
              <Typography variant="caption">Posisi/Role</Typography>
              <Typography variant="body2">{selectedEmp.role}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetail(false)}>Tutup</Button>
        </DialogActions>
      </Dialog>

      {/* Form Tambah Karyawan */}
      <FormTambahKaryawan
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleSaveEmployee}
        availableStores={availableStores}
        availableRoles={availableRoles}
      />

    </Box>
  );
}

export default Karyawan;