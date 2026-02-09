import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, Stack, LinearProgress,
  Divider, List, ListItem, ListItemText, ListItemIcon,
  Card, CardContent, Alert, Grid, Chip, Avatar, Collapse, IconButton
} from '@mui/material';
import {
  Sync, CloudDownload, CheckCircle, History,
  InfoOutlined, Person, ExpandMore
} from '@mui/icons-material';
import DateButton from "../components/DateButton";

// Import Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Absensi() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCharts, setShowCharts] = useState(false);
  const [expandHistory, setExpandHistory] = useState(false);

  // Data dummy untuk Chart
  const chartData = {
    labels: ['Hadir', 'Izin', 'Alpha', 'Sakit'],
    datasets: [
      {
        data: [85, 5, 2, 8],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3'],
        borderWidth: 1,
      },
    ],
  };

  // Data riwayat lengkap
  const allHistory = [
    { name: 'Budi Santoso', role: 'Manager', time: '08:00', status: 'Hadir' },
    { name: 'Siti Aminah', role: 'Staff Kasir', time: '08:15', status: 'Hadir' },
    { name: 'Rian Hidayat', role: 'Staff Gudang', time: '-', status: 'Alpha' },
    { name: 'Dewi Lestari', role: 'Supervisor', time: '07:55', status: 'Hadir' },
    { name: 'Ahmad Fauzi', role: 'Staff Admin', time: '08:05', status: 'Hadir' },
    { name: 'Linda Wijaya', role: 'Kasir', time: '08:20', status: 'Hadir' },
    { name: 'Rudi Hartono', role: 'Security', time: '07:50', status: 'Hadir' },
    { name: 'Novi Rahmawati', role: 'HRD', time: '-', status: 'Izin' },
  ];

  const displayedHistory = expandHistory ? allHistory : allHistory.slice(0, 4);

  const handleSync = () => {
    setIsSyncing(true);
    setShowCharts(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSyncing(false);
            setShowCharts(true); // Tampilkan chart setelah selesai
          }, 500);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 200);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1000px', margin: '0 auto' }}>

      {/* Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Box textAlign={{ xs: 'center', sm: 'left' }}>
          <Typography variant="h5" fontWeight="bold">Sinkronisasi Absensi</Typography>
        </Box>
        <DateButton />
      </Stack>

      <Alert severity="info" icon={<InfoOutlined />} sx={{ borderRadius: 2, marginBottom: 3 }}>
        Data akan ditarik berdasarkan tanggal yang dipilih di atas.
      </Alert>
      <div className='grid grid-cols-2 gap-5'>
        {/* Chart - Full Width di Atas */}
        {showCharts && (
          <div className="col-span-2 min-w-0 shadow-md">
            <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>
                  Statistik Kehadiran (Real-time)
                </Typography>

                {/* WRAPPER CHART */}
                <div className="w-full max-w-[420px] mx-auto">
                  <div className="relative h-[280px] md:h-[320px]">
                    <Doughnut
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false, // penting biar ga “maksa” dan tabrakan
                        plugins: {
                          legend: { position: "bottom" }, // biar legend ga nabrak
                        },
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        )}

        {/* Kolom Kiri: Kontrol Sinkronisasi */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 2, height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Stack alignItems="center" spacing={3}>
                <Box sx={{ p: 2, bgcolor: isSyncing ? 'primary.light' : 'grey.100', borderRadius: '50%', display: 'flex', color: isSyncing ? 'primary.main' : 'grey.500' }}>
                  <Sync sx={{ fontSize: 40, animation: isSyncing ? 'spin 2s linear infinite' : 'none' }} />
                  <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </Box>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>{isSyncing ? `Sinkronisasi... ${progress}%` : 'Siap Sinkronisasi'}</Typography>
                  <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 2 }} />
                </Box>
                <Button variant="contained" startIcon={<CloudDownload />} disabled={isSyncing} onClick={handleSync} fullWidth sx={{ borderRadius: 2, py: 1.5 }}>
                  Mulai Sinkronisasi
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Kolom Kanan: Riwayat Absen dengan Expand */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ borderRadius: 3, p: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, px: 2, pt: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <History fontSize="small" color="action" />
                <Typography variant="subtitle1" fontWeight="bold">Riwayat Absen Masuk</Typography>
              </Stack>
              <IconButton
                onClick={() => setExpandHistory(!expandHistory)}
                sx={{
                  transform: expandHistory ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              >
                <ExpandMore />
              </IconButton>
            </Stack>
            <Divider />
            <List sx={{ maxHeight: expandHistory ? 'none' : 400, overflow: 'auto' }}>
              {displayedHistory.map((item, index) => (
                <ListItem key={index} divider={index !== displayedHistory.length - 1}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: item.status === 'Alpha' ? 'error.light' : item.status === 'Izin' ? 'warning.light' : 'success.light' }}>
                      <Person sx={{ fontSize: 18 }} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="body2" fontWeight="bold">{item.name} ({item.role})</Typography>}
                    secondary={`Jam Masuk: ${item.time}`}
                  />
                  <Chip
                    label={item.status}
                    size="small"
                    color={item.status === 'Hadir' ? 'success' : item.status === 'Izin' ? 'warning' : 'error'}
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
            {!expandHistory && allHistory.length > 4 && (
              <Box sx={{ textAlign: 'center', pt: 2 }}>
                <Button size="small" onClick={() => setExpandHistory(true)}>
                  Lihat Semua ({allHistory.length} data)
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </div>
    </Box>
  );
}

export default Absensi;