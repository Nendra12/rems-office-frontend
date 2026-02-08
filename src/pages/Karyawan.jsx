import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Avatar, Chip, IconButton, Typography, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, MenuItem,
  Select, FormControl, Snackbar, Alert, Divider, Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  Store as StoreIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon
} from '@mui/icons-material';

const Karyawan = () => {
  // 1. DATA STATE
  const [dataKaryawan, setDataKaryawan] = useState([
    { id: 1, nik: '3578010101990001', name: 'Budi Santoso', address: 'Surabaya', phone: '081234567', hire_date: '2023-01-10', store: 'Toko Pusat', salary: 5000000, active: true },
    { id: 2, nik: '3578020205950002', name: 'Siti Aminah', address: 'Sidoarjo', phone: '085678901', hire_date: '2023-05-15', store: 'Cabang A', salary: 4500000, active: true },
  ]);

  const listToko = ['Toko Pusat', 'Cabang A', 'Cabang B', 'Gudang Utama'];

  // 2. UI STATE
  const [openTambah, setOpenTambah] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedKaryawan, setSelectedKaryawan] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [formTambah, setFormTambah] = useState({
    nik: '', name: '', address: '', phone: '', hire_date: '', store: 'Toko Pusat', salary: ''
  });

  // 3. LOGIC HANDLERS
  const handleToggleStatus = (id) => {
    setDataKaryawan(prev => prev.map(k => k.id === id ? { ...k, active: !k.active } : k));
    showToast("Status karyawan berhasil diubah", "info");
  };

  const handleMoveStore = (id, newStore) => {
    setDataKaryawan(prev => prev.map(k => k.id === id ? { ...k, store: newStore } : k));
    showToast(`Penempatan berhasil dipindah ke ${newStore}`, "success");
  };

  const handleSaveKaryawan = () => {
    const newEntry = { ...formTambah, id: Date.now(), active: true, salary: parseInt(formTambah.salary) };
    setDataKaryawan([...dataKaryawan, newEntry]);
    setOpenTambah(false);
    showToast("Karyawan baru berhasil ditambahkan", "success");
    setFormTambah({ nik: '', name: '', address: '', phone: '', hire_date: '', store: 'Toko Pusat', salary: '' });
  };

  const showToast = (message, severity) => {
    setToast({ open: true, message, severity });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a237e' }}>Manajemen Karyawan</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpenTambah(true)}
          sx={{ borderRadius: 3, px: 3, py: 1, textTransform: 'none', fontWeight: 'bold', boxShadow: 3 }}
        >
          Tambah Karyawan
        </Button>
      </Box>

      {/* TABLE SECTION */}
      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#ffffff' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>PROFIL KARYAWAN</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>PENEMPATAN</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#666' }} align="right">AKSI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKaryawan.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: row.active ? '#3f51b5' : '#e0e0e0', fontWeight: 'bold' }}>
                      {row.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{row.name}</Typography>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <BadgeIcon sx={{ fontSize: 12 }} /> {row.nik}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Select
                    variant="standard"
                    value={row.store}
                    onChange={(e) => handleMoveStore(row.id, e.target.value)}
                    disableUnderline
                    sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#3f51b5', bgcolor: '#f0f2ff', px: 1.5, py: 0.5, borderRadius: 2 }}
                  >
                    {listToko.map(toko => <MenuItem key={toko} value={toko}>{toko}</MenuItem>)}
                  </Select>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.active ? "Aktif" : "Nonaktif"} 
                    color={row.active ? "success" : "default"} 
                    size="small" 
                    sx={{ fontWeight: 'bold', borderRadius: 1.5 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => { setSelectedKaryawan(row); setOpenDetail(true); }}>
                    <ViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton color={row.active ? "error" : "success"} onClick={() => handleToggleStatus(row.id)}>
                    {row.active ? <BlockIcon fontSize="small" /> : <ActiveIcon fontSize="small" />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL TAMBAH */}
      <Dialog open={openTambah} onClose={() => setOpenTambah(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle sx={{ fontWeight: 'bold', pt: 3 }}>Tambah Karyawan Baru</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={6}>
              <TextField label="Nama Lengkap" fullWidth variant="outlined" value={formTambah.name} onChange={e => setFormTambah({...formTambah, name: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="NIK" fullWidth variant="outlined" value={formTambah.nik} onChange={e => setFormTambah({...formTambah, nik: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Telepon" fullWidth variant="outlined" value={formTambah.phone} onChange={e => setFormTambah({...formTambah, phone: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Gaji (Rp)" type="number" fullWidth variant="outlined" value={formTambah.salary} onChange={e => setFormTambah({...formTambah, salary: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Alamat" fullWidth multiline rows={2} variant="outlined" value={formTambah.address} onChange={e => setFormTambah({...formTambah, address: e.target.value})} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenTambah(false)} sx={{ color: 'text.secondary' }}>Batal</Button>
          <Button variant="contained" onClick={handleSaveKaryawan} sx={{ borderRadius: 2, px: 4 }}>Simpan</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL DETAIL */}
      <Dialog open={openDetail} onClose={() => setOpenDetail(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 5 } }}>
        {selectedKaryawan && (
          <Box sx={{ pb: 3 }}>
            <Box sx={{ height: 100, bgcolor: '#1a237e', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <Avatar sx={{ width: 80, height: 80, mb: -4, border: '4px solid white', bgcolor: '#3f51b5', fontSize: 32 }}>
                {selectedKaryawan.name.charAt(0)}
              </Avatar>
            </Box>
            <DialogContent sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{selectedKaryawan.name}</Typography>
              <Typography variant="caption" color="text.secondary" gutterBottom>{selectedKaryawan.nik}</Typography>
              
              <Box sx={{ mt: 3, textAlign: 'left', bgcolor: '#f5f5f5', p: 2, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Gaji Pokok</Typography>
                  <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 'bold' }}>Rp {selectedKaryawan.salary.toLocaleString('id-ID')}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <StoreIcon sx={{ fontSize: 14 }} /> {selectedKaryawan.store}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <PhoneIcon sx={{ fontSize: 14 }} /> {selectedKaryawan.phone}
                </Typography>
              </Box>
            </DialogContent>
            <Box sx={{ px: 3 }}>
              <Button fullWidth variant="contained" color="inherit" onClick={() => setOpenDetail(false)} sx={{ borderRadius: 3, bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#333' } }}>
                Tutup Profil
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>

      {/* NOTIFIKASI */}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast.severity} sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
          {toast.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default Karyawan;