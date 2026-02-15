import {
  Box, Typography, Grid, Card, CardContent, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, Chip, Avatar, IconButton, Stack
} from '@mui/material';
import { 
  Payments, 
  Download, 
  AccountBalanceWallet, 
  PeopleAlt, 
  CheckCircle 
} from '@mui/icons-material';
import DateButton from  "../components/DateButton"

const payrollData = [
  { id: 1, name: 'Budi Santoso', role: 'Staff Gudang', basic: 4500000, allowance: 500000, tax: 50000, status: 'Paid' },
  { id: 2, name: 'Siti Aminah', role: 'Kasir', basic: 4200000, allowance: 300000, tax: 45000, status: 'Pending' },
  { id: 3, name: 'Rian Hidayat', role: 'Manager', basic: 8000000, allowance: 1500000, tax: 150000, status: 'Paid' },
];

function Payroll() {
  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        spacing={2} 
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">Payroll Management</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <DateButton />
          <Button variant="contained" startIcon={<Payments />} sx={{ borderRadius: 2 }}>
            Run Payroll
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}><AccountBalanceWallet /></Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">Total Pengeluaran Gaji</Typography>
                  <Typography variant="h6" fontWeight="bold">{formatIDR(19450000)}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'success.light', color: 'success.main' }}><CheckCircle /></Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">Sudah Dibayar</Typography>
                  <Typography variant="h6" fontWeight="bold">2/3 Karyawan</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'info.light', color: 'info.main' }}><PeopleAlt /></Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">Periode</Typography>
                  <Typography variant="h6" fontWeight="bold">Februari 2026</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: '#fdfdfd' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Karyawan</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gaji Pokok</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tunjangan</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Potongan (PPh)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Bersih</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem' }}>{row.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">{row.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{row.role}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{formatIDR(row.basic)}</TableCell>
                <TableCell>{formatIDR(row.allowance)}</TableCell>
                <TableCell sx={{ color: 'error.main' }}>-{formatIDR(row.tax)}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  {formatIDR(row.basic + row.allowance - row.tax)}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    size="small" 
                    color={row.status === 'Paid' ? 'success' : 'warning'} 
                    variant="soft" // Custom look if using specific themes, otherwise standard
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" title="Download Slip">
                    <Download fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Payroll;
