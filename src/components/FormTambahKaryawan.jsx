import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, FormControl, InputLabel, Select, MenuItem,
    Box
} from '@mui/material';

function FormTambahKaryawan({ open, onClose, onSave, availableStores, availableRoles }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        contractStart: '',
        store: '',
        role: 'Helper'
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
        setFormData({
            name: '',
            email: '',
            address: '',
            phone: '',
            contractStart: '',
            store: '',
            role: ''
        });
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Tambah Karyawan Baru</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                <TextField
                    label="Nama Lengkap"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <TextField
                    label="Alamat"
                    fullWidth
                    variant="outlined"
                    size="small"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                />
                <TextField
                    label="No. Telepon"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextField
                        label="Kontrak Mulai"
                        type="date"
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={formData.contractStart}
                        onChange={(e) => handleChange('contractStart', e.target.value)}
                    />
                </Box>
                <FormControl fullWidth size="small">
                    <InputLabel>Penempatan Toko</InputLabel>
                    <Select
                        value={formData.store}
                        label="Penempatan Toko"
                        onChange={(e) => handleChange('store', e.target.value)}
                    >
                        {availableStores.map((store) => (
                            <MenuItem key={store} value={store}>{store}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        value={formData.role} 
                        label="Role"
                        onChange={(e) => handleChange('role', e.target.value)}
                    >
                        {availableRoles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Batal</Button>
                <Button variant="contained" onClick={handleSubmit}>Simpan</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormTambahKaryawan;
